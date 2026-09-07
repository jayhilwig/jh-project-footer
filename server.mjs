import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname=fileURLToPath(new URL(".",import.meta.url));
const publicDir=join(__dirname,"public");
const port=Number(process.env.PORT||3000);

const types={
  ".html":"text/html; charset=utf-8",
  ".js":"text/javascript; charset=utf-8",
  ".css":"text/css; charset=utf-8",
  ".json":"application/json; charset=utf-8"
};

function safePath(urlPath){
  const clean=normalize(
    decodeURIComponent((urlPath||"/").split("?")[0])
  ).replace(/^(\.\.[/\\])+/,"");

  return clean==="/" ? "/index.html" : clean;
}

http.createServer(async(req,res)=>{
  try{
    const pathname=safePath(req.url);
    let filePath=join(publicDir,pathname);

    if(!filePath.startsWith(publicDir)){
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    try{
      const info=await stat(filePath);
      if(info.isDirectory()) filePath=join(filePath,"index.html");
    }catch{
      res.writeHead(404,{
        "Content-Type":"text/plain; charset=utf-8",
        "Access-Control-Allow-Origin":"*"
      });
      res.end("Not found");
      return;
    }

    const data=await readFile(filePath);
    const ext=extname(filePath);

    const cacheControl =
      ext===".js"
        ? "public, max-age=300, stale-while-revalidate=86400"
        : ext===".html"
          ? "public, max-age=60, stale-while-revalidate=3600"
          : "public, max-age=3600";

    res.writeHead(200,{
      "Content-Type":types[ext]||"application/octet-stream",
      "Access-Control-Allow-Origin":"*",
      "Cross-Origin-Resource-Policy":"cross-origin",
      "X-Content-Type-Options":"nosniff",
      "Cache-Control":cacheControl
    });

    res.end(data);
  }catch(error){
    console.error(error);
    res.writeHead(500,{
      "Content-Type":"text/plain; charset=utf-8"
    });
    res.end("Server error");
  }
}).listen(port,"0.0.0.0",()=>{
  console.log(`JH Project Footer listening on ${port}`);
});
