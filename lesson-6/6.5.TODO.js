// listing6.5.js (router.js)

/**
 * listing6.5.js (router.js)
 * router.js에서 exports 객체에 함수 추가
 *
 * (이 router.js 파일을 listing6.6js (main.js)에서 require로 사용해야 한다)
 */
const httpStatus = require('http-status-codes'),
  htmlContentType = {
    "Content-Type": "text/html"
  },
  // POST 및 GET 요청에 매핑된 라우트를 저장할 routes 객체의 정의
  routes = {
    GET: {
      "/info":(req, res) => {
        res.writeHead(httpStatus.OK, {
          "Content-Type": "text/plain"
        });
        res.end("Welcom to the Info Page!");
      },
    },
    POST: {}
  };

// 라우트에 따른 콜백 함수를 처리하기 위한 함수 handle의 생성
exports.handle = (req, res) => {
  try{
    if (routes[req.method][req.url]) {
      routes[req.method][req.url](req, res);
    } else {
      res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
      res.end("<h1>404</h1><h2>File not Found</h2>")
    }
  } catch (e) {
      console.log("error:"+ e);
  }
};

// main.js로부터 routes에 등록하기 위한 get 및 post 함수 생성
exports.get = (url, action) => {
  routes["GET"][url] = action;
};
exports.post = (url, action) => {
  routes["POST"][url] = action;
};

// <<< 나머진 라우트 코드 입력 하십시오 >>>

/**
 * get 또는 post를 호출하면 해당 라우트에 도달할 때 실행할 라우트와 함수를 전달해야 한다.
 * 이 함수는 리우트를 routes 객체에 추가해 등록하며, handle 함수에 의해 사용된다.
 *
 * 마지막 단계는 main.js로 router.js를 가져오는 것이다.
 *
 * main.js에서 수행하는 모든 함수 호출에 router를 추가해야 한다.
 * 이 함수는 이제 router.js에 속한다. 이 서버 생성을 통해 모든 요청들은 라우트 모듈의 처리
 * 함수에 의해 처리되며, 처리 함수에는 콜백 함수가 뒤따른다. 이제 router.get 이나 router.post를
 * 사용해 요청에서 라우트로 사용될 HTTP 메소드를 지정할 수 있다. 두 번째 변수는 요청을
 * 받았을 때 수행되기를 원하는 콜백이다.
 */
