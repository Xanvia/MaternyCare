import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Notice } from "../entity/Notice";

// export class NoticeController {
//   private noticeRepository = AppDataSource.getRepository(Notice);

//   async all(request: Request, response: Response, next: NextFunction) {
//     return this.noticeRepository.find();
//   }

//   async one(request: Request, response: Response, next: NextFunction) {
//     const id = parseInt(request.params.id);

//     const notice = await this.noticeRepository.findOne({
//       where: { id },
//     });

//     if (!notice) {
//       return "unlisted notice";
//     }
//     return notice;
//   }

//   async save(request: Request, response: Response, next: NextFunction) {
//     const { title, subtitle, message } = request.body;

//     const notice = Object.assign(new Notice(), {
//       title,
//       subtitle,
//       message,
//     });

//     return this.noticeRepository.save(notice);
//   }

//   async remove(request: Request, response: Response, next: NextFunction) {
//     const id = parseInt(request.params.id);

//     let noticeToRemove = await this.noticeRepository.findOneBy({ id });

//     if (!noticeToRemove) {
//       return "this notice not exist";
//     }

//     await this.noticeRepository.remove(noticeToRemove);

//     return "notice has been removed";
//   }
// }

export class NoticeController {
  private noticeRepository = AppDataSource.getRepository(Notice);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.noticeRepository.find({
      where: { deletedAt: null }, // Fetch only non-deleted records
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const notice = await this.noticeRepository.findOne({
      where: { id, deletedAt: null }, // Ensure it's not soft-deleted
    });

    if (!notice) {
      return "unlisted or deleted notice";
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

    let noticeToRemove = await this.noticeRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!noticeToRemove) {
      return "this notice does not exist or is already deleted";
    }

    noticeToRemove.deletedAt = new Date(); // Set the deletedAt timestamp
    await this.noticeRepository.save(noticeToRemove);

    return "notice has been soft deleted";
  }
}
