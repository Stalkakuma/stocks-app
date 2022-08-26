import { Candle } from "../types/types";

interface UserActionsDataValues {
  nameOfCompany: string;
  priceHistory: Candle[];
}

export const sendToServer = (usersActionData: UserActionsDataValues | null) => {
  if (
    usersActionData?.priceHistory &&
    usersActionData.priceHistory.length > 0
  ) {
    fetch("user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(usersActionData),
    })
      .then((response) => response.json())
      .then((result) => console.log("Success: ", result))
      .catch((err) => console.log(err));
  }
};
