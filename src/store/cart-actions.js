import { replaceCart } from "./cartSlice";
import { useHttpClient } from "../shared/hooks/http-hook";

export const fetchCartDate = async () => {
  return async (dispatch) => {
    const FetchData = async () => {
      const { isLoading, error, sendRequest, clearError } = useHttpClient();
      const responseData = await sendRequest(
        "http://127.0.0.1:8000/api/user/cart/fetch",
        "GET"
      );
      return { isLoading, error, clearError, responseData };
    };

    try {
      const { responseData } = await FetchData();
      dispatch(
        replaceCart({
          items: responseData.items || [],
          totalQuantity: responseData.totalQuantity,
        })
      );
    } catch (err) {}
  };
};

export const sendCartData = (cartData, id) => {
  return async () => {
    const SendData = async () => {
      const { isLoading, error, sendRequest, clearError } = useHttpClient();
      await sendRequest(
        `http://127.0.0.1:8000/api/user/cart/${id}`,
        "PUT",
        cartData
      );
      return { isLoading, error, clearError };
    };
    try {
      await SendData();
    } catch (err) {}
  };
};
