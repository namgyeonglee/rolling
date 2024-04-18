export const API_INFO = {
  baseUrl: "https://rolling-api.vercel.app",
  endPoints: {
    getBackgroundImages: { url: "/background-images/", method: "GET" },
    getProfileImages: { url: "/profile-images/", method: "GET" },

    //messages
    getMessages: { url: "/5-10/messages/{param1}/", method: "GET" },
    putMessages: { url: "/5-10/messages/{param1}/", method: "PUT" },
    patchMessages: { url: "/5-10/messages/{param1}/", method: "PATCH" },
    deleteMessages: { url: "/5-10/messages/{param1}/", method: "DELETE" },

    //recipients
    getRecipients: { url: "/5-10/recipients/", method: "GET" },
    postRecipients: { url: "/5-10/recipients/", method: "POST" },
    getRecipientsById: { url: "/5-10/recipients/{param1}/", method: "GET" },
    deleteRecipients: { url: "/5-10/recipients/{param1}/", method: "DELETE" },

    getRecipientsMessages: {
      url: "/5-10/recipients/{param1}/messages/",
      method: "GET",
    },
    postRecipientsMessages: {
      url: "/5-10/recipients/{param1}/messages/",
      method: "POST",
    },
    getRecipientsReactions: {
      url: "/5-10/recipients/{param1}/reactions/",
      method: "GET",
    },
    postRecipientsReactions: {
      url: "/5-10/recipients/{param1}/reactions/",
      method: "POST",
    },
  },
};

export function putParams(url, ...args) {
  args.forEach((item, idx) => {
    url = url.replace(`{param${idx + 1}}`, item);
  });

  return url;
}
