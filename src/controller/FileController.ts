import { Controller, PUT, DELETE, GET } from "../decorators";
import { NextFunction, Request, Response } from "express";
import * as rp from 'request-promise'

interface IClientResposne {
  pause: () => void;
  pipe: (res: Response) => void;
}

@Controller("/api")
export class FileController {

  @GET("/v2/file_stream/:name")
  public async fileStream(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
      const { name = "" } = req?.params || {};
      const {protocol, headers: {host}} = req;
      const fileUrl = `${protocol}://${host}/${name}`
      // 可下载附件header设置
      res.setHeader("content-disposition", `attachment; filename=${name}`)
      new Promise((resolve, reject) => {
        rp.get(fileUrl)
          .on('response',(res: IClientResposne) => {
              // 终止即读
              res.pause();
              resolve(res);  
          });
      }).then((response: IClientResposne) => {
          // 管道传输降低压力
          response.pipe(res);
      });
  }
}
