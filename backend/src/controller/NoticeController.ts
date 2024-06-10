import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Notice } from "../entity/Notice";

export class NoticeController {
  private noticeRepository = AppDataSource.getRepository(Notice);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.noticeRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const notice = await this.noticeRepository.findOne({
      where: { id },
    });

    if (!notice) {
      return "unlisted notice";
    }
    return notice;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { title, subtitle, message } = request.body;

    const notice = Object.assign(new Notice(), {
      title,
      subtitle,
      message,
    });

    return this.noticeRepository.save(notice);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let noticeToRemove = await this.noticeRepository.findOneBy({ id });

    if (!noticeToRemove) {
      return "this notice not exist";
    }

    await this.noticeRepository.remove(noticeToRemove);

    return "notice has been removed";
  }
}
