export const formatDate = (dateCreated) => {
    const DDMMYYYY = dateCreated.split("T")[0].split("-").reverse().join("/");
    return DDMMYYYY;
  };