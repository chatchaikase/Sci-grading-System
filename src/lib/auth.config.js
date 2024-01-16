export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accountId = user.accountId;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user.accountId = token.accountId),
          (session.user.isAdmin = token.isAdmin);
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnStartPanel = request.nextUrl?.pathname.startsWith("/");
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      const isOnSubjectListPanel = request.nextUrl?.pathname.startsWith("/list/subjectlist");
      const isOnStudentListtPanel = request.nextUrl?.pathname.startsWith("/list/studentlist");
      const isOnSettingAccountPanel = request.nextUrl?.pathname.startsWith("/settings/account");
      const isOnSettingPrivacyPanel = request.nextUrl?.pathname.startsWith("/settings/privacy");
      const isOnHelpPanel = request.nextUrl?.pathname.startsWith("/help");
      const isOnImportListPanel = request.nextUrl?.pathname.startsWith("/list/importlist");
      const isOnImportMaintainPanel = request.nextUrl?.pathname.startsWith("/list/importmaintain");

      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      if (isOnSubjectListPanel && !user) {
        return false;
      }

      if (isOnStudentListtPanel && !user) {
        return false;
      }

      if (isOnSettingAccountPanel && !user) {
        return false;
      }

      if (isOnSettingPrivacyPanel && !user) {
        return false;
      }

      if (isOnHelpPanel && !user) {
        return false;
      }

      if (isOnImportListPanel && !user) {
        return false;
      }

      if (isOnImportMaintainPanel && !user) {
        return false;
      }

      if (isOnStartPanel && !user) {
        return false;
      }

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
