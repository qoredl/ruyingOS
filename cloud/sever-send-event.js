/**
 * parse server服务
 * 本文件改动会比较频繁
 * date:2017-3-25
 */
module.exports=function (req,res) {
  console.log(req.url);
  if (req.url === '/seversSendEvent') {
    res.writeHeader(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
	
	const createData=()=>{
      res.write("data: " +'现在时间：'+new Date() + '\n\n');
    }
  
    setInterval(createData,3000);
  }
  
};