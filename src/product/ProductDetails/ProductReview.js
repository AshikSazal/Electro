import React from "react";

import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import GiveRating from "./GiveRating";
import { useAuth } from "../../shared/hooks/auth-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

const ProductReview = () => {
  const { token, role } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  return (
    <div>
      <form action="">
      <GiveRating />
      <Input
        id="comment"
        placeholder="Comment"
        element="textarea"
        type="text"
      />
      </form>
    </div>
  );
};

export default ProductReview;
