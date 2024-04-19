import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_INFO } from "../../api/api";
import SubmitButton from "../../components/SubmitButton";
import ToggleButton from "../../components/ToggleButton";
import { useApi, useFetch } from "../../hooks/useFetch";
import Header from "./Header";
import ToInput from "./Input";
import Selector from "./Option";
import PostCreatePageForm from "./PostCreatePageForm";
import { Subtitle, Title } from "./Title";

const { baseUrl, endPoints } = API_INFO;

function PostCreatePage() {
  const [isActive, setIsActive] = useState(false);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [postData, setPostData] = useState({
    team: "5-10",
    name: "",
    backgroundColor: "beige",
    backgroundImageURL: null,
  });
  const [createdId, setCreatedId] = useState(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const { data, loading, error } = useFetch({
    url: baseUrl + endPoints.getBackgroundImages.url,
  });
  const [sendRequest, apiData, apiLoading, apiError] = useApi();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitSuccess(false);
    sendRequest({
      url: baseUrl + endPoints.postRecipients.url,
      method: endPoints.postRecipients.method,
      body: postData,
    });

    setIsSubmitSuccess(true);
  };

  const handleChange = (target, value) => {
    setPostData((prevData) => ({ ...prevData, [target]: value }));
  };

  // 제출 성공시 페이지 이동
  useEffect(() => {
    if (!apiLoading && apiError === null) {
      window.localStorage.setItem("recipientId", apiData.id);
      navigate(`./${apiData.id}`);
    }
  }, [apiData, apiLoading, apiError]);

  return (
    <>
      <Header></Header>
      <PostCreatePageForm>
        <div className="PostCreatePageForm__input-box">
          <Title>To.{postData.name}</Title>
          <ToInput
            placeholder="받는 사람 이름을 입력해주세요."
            onChange={handleChange}
            target="name"
          />
        </div>
        <div className="PostCreatePageForm__title-box">
          <Title>배경 화면을 선택해 주세요</Title>
          <div></div>
          <Subtitle>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</Subtitle>
        </div>
        <div className="PostCreatePageForm__option-box">
          <ToggleButton onClick={setIsActive} isActive={isActive} />
          <Selector
            isImage={isActive}
            onClick={handleChange}
            backgroundImages={{ backData: data, loading, error }}
          />
        </div>
        <div className="PostcreatePageForm__submit-box">
          <SubmitButton disabled={!postData.name} onClick={handleSubmit}>
            생성하기
          </SubmitButton>
        </div>
      </PostCreatePageForm>
    </>
  );
}

export default PostCreatePage;
