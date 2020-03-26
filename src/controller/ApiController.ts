import { Controller, PUT, DELETE, GET } from "../decorators";
import { NextFunction, Request, Response } from "express";
import { mock } from "mockjs";

const template = require("../entity/template");
const templates = require("../entity/templates");
const widget = require("../entity/widget");
const user_tag = require("../entity/userTag");

@Controller("/api")
export class ApiController {
  @PUT("/v2/persona_info/template")
  public async create_template(
    req: Request,
    response: Response,
    next: NextFunction
  ) {
    const { type, user_tags, widgets } = req?.body || {};
    if (type === "1" || type === 1) {
      if (user_tags?.length) {
        const res = await mock({
          data: {
            id: "@id"
          },
          status: "单体用户画像模板创建成功"
        });
        return Promise.resolve({
          data: {
            ...res.data,
            ...(req?.body || {})
          }
        });
      } else {
        response.status(500);
        return Promise.resolve({
          status: "用户标签数量不能为空"
        });
      }
    }
    if (type === "2" || type === 2) {
      if (widgets?.length) {
        const res = mock({
          data: {
            id: "@id"
          },
          status: "用户群画像模板创建成功"
        });
        return Promise.resolve({
          data: {
            ...res.data,
            ...(req?.body || {})
          }
        });
      } else {
        response.status(500);
        return Promise.resolve({
          status: "画像数量不能为空"
        });
      }
    }
    response.status(500);
    return Promise.resolve({
      status: "缺少必要数据画像类型"
    });
  }

  @PUT("/v2/persona_info/:id/template")
  public async update_template(
    req: Request,
    response: Response,
    next: NextFunction
  ) {
    const { id = "" } = req?.params || {};
    const { type } = req?.body || {};
    if (id) {
      if (type === 1 || type === "1") {
        return Promise.resolve({
          data: {
            id,
            ...(req?.body || {})
          },
          status: "单体用户画像模板修改成功"
        });
      }
      if (type === 2 || type === "2") {
        return Promise.resolve({
          data: {
            id,
            ...(req?.body || {})
          },
          status: "用户群画像模板修改成功"
        });
      }
      response.status(500);
      return Promise.resolve({
        status: "type不能为空"
      });
    } else {
      response.status(500);
      return Promise.resolve({
        status: "id不能为空"
      });
    }
  }

  @DELETE("/v2/persona_info/:id/template")
  public async delete_template(
    req: Request,
    response: Response,
    next: NextFunction
  ) {
    const { id = "" } = req?.params || {};
    if (id) {
      return Promise.resolve({
        status: "删除成功"
      });
    }
    response.status(500);
    return Promise.resolve({
      status: "id不能为空"
    });
  }

  @GET("/v2/persona_info/template")
  public async get_templates(
    req: Request,
    response: Response,
    next: NextFunction
  ) {
    const { project = "", type } = req?.query || {};
    if (project) {
      if (type === "1" || type === 1) {
        const { data = [] } = templates();
        const res = {
          data: data.map(() => {
            const item = template();
            const user_tags = user_tag();
            return {
              ...item,
              ...user_tags
            };
          })
        };
        return Promise.resolve(res);
      }
      if (type === "2" || type === 2) {
        const { data = [] } = templates();
        const res = {
          data: data.map(() => {
            const item = template();
            const widgets = widget();
            return {
              ...item,
              ...widgets
            };
          })
        };
        return Promise.resolve(res);
      }
      response.status(500);
      return Promise.resolve({
        status: "type不能为空"
      });
    }
    response.status(500);
    return Promise.resolve({
      status: "项目不能为空"
    });
  }

  @GET("/v2/persona_info/:id/template")
  public async get_template(
    req: Request,
    response: Response,
    next: NextFunction
  ) {
    const { type = "" } = req?.query || {};
    const { id = "" } = req?.params || {};
    if (id) {
      if (type === 1 || type === "1") {
        const data = template();
        const user_tags = user_tag();
        const res = {
          ...data,
          ...user_tags
        };
        return Promise.resolve(res);
      }
      if (type === 2 || type === "2") {
        const data = template();
        const widgets = widget();
        const res = {
          ...data,
          ...widgets
        };
        return Promise.resolve(res);
      }
      response.status(500);
      return Promise.resolve({
        status: "type不能为空"
      });
    }
    response.status(500);
    return Promise.resolve({
      status: "id不能为空"
    });
  }
}
