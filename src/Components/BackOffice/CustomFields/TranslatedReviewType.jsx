import { useRecordContext } from "react-admin";
import { translateReviewType } from "../../../utils/functions";

const TranslatedReviewType = ({ source }) => {
  const record = useRecordContext();
  if (!record) return null;
  return <p>{translateReviewType(record[source])}</p>;
};

export default TranslatedReviewType;