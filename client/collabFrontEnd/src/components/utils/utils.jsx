export const getFullYear = () => new Date().getFullYear();

export const getFooterCopy = (isIndex) => (isIndex ? "CollaboratED" : "CollaboratEd main dashboard");

export const getLatestNotification = () => {
  return "<strong>Urgent requirement</strong> - complete by EOD";
};