import request from "~/utils/request";

export const newProduct = async (soLuong) => {
  try {
    const res = await request.get(`products/latest/${soLuong}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
