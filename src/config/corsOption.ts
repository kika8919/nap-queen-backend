const allowedOrigins = ["localhost:4200"];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow: boolean) => void
  ) => {
    if (allowedOrigins.indexOf(origin || "") !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log("cors err");
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
