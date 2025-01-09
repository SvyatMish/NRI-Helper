export const getFiles = async (
  folder: string
): Promise<{ fileName: string; data: any }[]> => {
  const response = await fetch(
    `/files?${new URLSearchParams({
      folder,
    }).toString()}`
  );
  return await response.json();
};

export const saveFile = async (body: {
  fileName: string;
  folder: string;
  data: any;
}): Promise<void> => {
  console.log("body?", body);
  await fetch("/save-file", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });
};
