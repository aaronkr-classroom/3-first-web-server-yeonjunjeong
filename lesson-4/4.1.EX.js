// listing4.1.js

/**
 * simple_server 예시
 *
 * 코드: p. 84-85
 * 설명: p. 83-84 (여기 주석에서도 포함)
 */

// 애플리케이션에서 사용할 포트 번호인 3000을 지정한다. (80번호는 HTTP, 443번호는 HTTPS)
const port = 3000;

// http라는 특정 Node.js 모듈을 가져와 상수로 저장한다.
const http = require('http');

// http 상태 코드를 나타내는 상수를 제공하려면 http-status-codes 패키지가 필요하다.
const httpStatus = require('http-status-codes');

// 200 : OK
// 301 : Redirect
// 404 : File Not Found Error
// 500 : Server Error

// http 변수를 HTTP 모듈에 대한 참조로 사용하고 해당 모듈의 createServer
// 함수를 사용해 서버를 만들고 결과 서버를 app 이라는 변수에 저장한다.
// createServer 함수는 새로운 http.Server 인스턴스를 생성한다.
const app = http.createServer((req, res) => {

  // (req, res) 새로 만들어진 서버 인스턴스로 앱은 HTTP 요청(req)을 받을 준비를 하고 HTTP 응답(res)을 전송한다.

  // 시스템은 클라이언트로부터 요청을 받았음을 기록하고
  console.log("Message receivede!");

  // 콜백 함수의 response 매개변수를 사용해 처음 요청을 받은 사용자에게 다시 내용을보낸다.
  // 첫 번째 줄에서는 writeHead 메소드를 사용해 응답의 HTTP 헤더의 기본 속성을 정의한다.
  res.writeHead(httpStatus.OK,{
    "Content-Type": "text/html"
  });

    // 이 경우 시스템은 httpStatus.OK를 돌려준다. 이는 응답 코드 200으로 표현되다.
    // HTTP 헤더는 요청이나 응답에서 전송되는 내용을 설명하는 정보 필드를 포함한다.



  // 이 코드 블록에 의해 시스템은 로컬 변수인 resMsg를 HTML의 메시지 응답에 할당한다.
  let resMsg = "<h1>Hello, Everybody!</h1>";

  // 바로 다음 줄에 write를 써서 HTML 형식의 출력문으로 응답을 시작하고 end를 써서 응답을 종료시킨다.
  res.write(resMsg);

  // 응답이 종료될 때에는 반드시 end를 사용해 더 이상 응답 출력은 없다고
  // 서버에 확인시켜 줘야 하며, 그렇지 않을 경우 서버는 커넥션을 끊지 않고
  // 계속 연결하고 있어 요청을 받을 수 없는 상태로 남게 된다.
  res.end();

  // 이 시점에서 응답로그를남기게 되면 여러분은 어떤 서버에서 어떤 응답을 보냈는지 확인이 가능하다.
  console.log(`Sent message: ${resMsg}`);
});


// 애플리케이션 서버에 3000번 포트를 수신하도록 한다.
if (process.env.NODE_ENV !== "test") 
  app.listen(port);

// 만일 포트 딩버를 지정하지 않는다면 운영체제는 임의로 포트를 지정해줄 것이다
// 이 포트 넘버는 웹 브라우저를 통해 웹 서버가 실행되고 있는지 확인하는 데 사용된다.
console.log(`Server at: http://localhost:${port}`);


/**
 * 애플리케이션의 실헬
 *
 * 이 파일 전체의 내용을 main.js에 복사하십시오.
 * 터미널에서 프로젝트 디렉터리로 이동해 node main 명령을 입력하기만 하면 된다. 
 * 그 후 브라우저를 열어 URL 입력란에 localhost:3000을 입력한다.
 *
 * http://localhost:3000
 *
 * 애플리케이션을 종료하기 위해서는 Ctrl+C를 터미널에서 입력한다.
 */
module.exports = app;