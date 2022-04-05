export const catchAsync = (cb: any) => {
  return (req: any, res: any, next: any) => {
    cb(req, res, next).catch((err: any) => {
      return next(err);
    });
  };
};
