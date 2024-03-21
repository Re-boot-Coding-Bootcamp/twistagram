import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
    });
  }),
  updateCurrentUser: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        bio: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
    }),
});
