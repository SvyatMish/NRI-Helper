export const getFiles = async (
  folder: string
): Promise<{ name: string; data: any }[]> => {
  const response = await fetch(
    `/files?${new URLSearchParams({
      folder,
    }).toString()}`
  );
  return await response.json();
};
