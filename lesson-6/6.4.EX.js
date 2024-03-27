// listing6.4.js

/**
 * listing6.4.js
 * 프로젝트 내 main.js에서 각 파일별 특정 라우티를 가지는 웹 서거 구현
 */
const port = 3000,
  http = require('http'),
  httpStatus = require('http-status-codes'),
  fs = require('fs');

const sendErrorResp = (res) => {
  // 에러 핸들링 함수 생성
  res.writeHead(httpStatus.NOT_FOUND, {
    "Content-Type" : "text/html"
  });
  res.write("<h1>404</h1><h2>File not Found.</h2>");
  res.end();
};

const app = http
  .createServer((req,res) => {
    let url = req.url; // url 변수에 요청 URL 저장

    // URL에 파일 확장자가 있는지 확인
    if (url.indexOf(".html") !== -1) {
      // 요청 콘텐츠 유형의 지정
      // 파일을 읽어들이기 위한 readFile의 호출
      res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
      });
      //req.url = "/sample.html"
      customReadFile(`./views/${url}`, res);
    } else if (url.indexOf(".js") !== -1) {
      res.writeHead(httpStatus.Ok,{
        "Content-Type": "text/javascript"
      });
      customReadFile(`./public/js${url}`, res);
    } else if (url.indexOf(".css") !== -1) {
      res.writeHead(httpStatus.Ok,{
        "Content-Type": "text/css"
      });
      customReadFile(`./public/css${url}`, res);
    } else if (url.indexOf(".png") !== -1) {
      res.writeHead(httpStatus.Ok,{
        "Content-Type": "image/png"
      });
      customReadFile(`./public/css${url}`, res);
    } else {
      sendErrorResp(res);
    }
  });

if (process.env.NODE_ENV !== "test"){
  app.listen(port);
}

console.log(`server at: http://localhost:${port}`);

// 이름으로 요청된 파일 찾기
const customReadFile = (file_path, res) => {
  // 파일이 존재하는지 확인
  if(fs.existsSync(file_path)) {
    fs.readFile(file_path), (error, data) => {
      if (error){
        console.log(error);
        sendErrorResp(res);  
      }
      res.writ(data);
      res.end();
    };
  } else {
    sendErrorResp(res);
  }
};

/**
 * 이제 여러분의 애플리케이션은 존재하지 않는 파일에 대한 대응을 할 수 있게 됐다.
 */
module.exports = app;