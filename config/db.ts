import { PrismaClient } from "@prisma/client";
import * as logger from "@util/logger";
/**
 * @docs https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging
 */
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

prisma.$on("query", (e) => {
  if (process.env.LISTEN_DB === "true") {
    logger.info("Query: " + e.query);
    logger.info("Params: " + e.params);
    logger.info("Duration: " + e.duration + "ms");
  }
});

export default prisma;