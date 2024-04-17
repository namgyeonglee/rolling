import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { API_INFO, putParams } from "../../api/api";
import { useApi, useFetch } from "../../hooks/useFetch";
import { Bold18, Bold24, Regular16 } from "../../styles/FontStyle";
import { TextEditor } from "./TextEditor";

const StyledForm = styled.form`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;

  @media screen and (max-width: 768px) {
    margin-left: 24px;
    margin-right: 24px;
    width: 100%;
  }

  @media screen and (max-width: 360px) {
    margin-left: 20px;
    margin-right: 20px;
    width: 100%;
  }
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  ${Bold24};
  color: var(--gray900);
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  ${Regular16};
  border: 1px solid var(--gray300);
  color: var(--gray500);

  &::placeholder {
    color: var(--gray500);
  }
`;

const Select = styled.select`
  max-width: 50%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--gray300);
  ${Regular16};
  color: var(--gray500);

  @media screen and (max-width: 360px) {
    max-width: 100%;
  }
`;

const Submit = styled.input`
  width: 100%;
  padding: 14px 0;
  border-radius: 12px;
  ${Bold18};
  border: 0;
  color: var(--white);
`;

const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 9999px;
`;

const ResetButton = styled.button`
  position: absolute;
  top: 1px;
  left: 55px;
  width: 25px;
  height: 25px;
  border-radius: 9999px;
  border: 0.5px solid var(--white);
  background-color: var(--gray600);
  color: var(--white);

  @media screen and (max-width: 360px) {
    position: absolute;
    top: 45px;
    left: 55px;
  }
`;

const ProfileImgOptionsLayout = styled.div`
  display: block;
`;

const ProfileImgOptions = styled.img`
  width: 54px;
  height: 54px;
  object-fit: cover;
  border-radius: 9999px;
  margin-right: 4px;
  margin-bottom: 4px;

  @media screen and (max-width: 360px) {
    width: 40px;
    height: 40px;
    margin-right: 4px;
    margin-bottom: 4px;
  }
`;

const Description = styled.p`
  ${Regular16};
`;

const INITIAL_VALUES = {
  sender: "",
  img: "",
  relationship: "지인",
  content: "",
  font: "Noto Sans",
};

export function Form() {
  const url = API_INFO.baseUrl + API_INFO.endPoints.getProfileImages.url;
  const { data } = useFetch({ url });
  const defaultImg = data?.imageUrls[0];

  const [values, setValues] = useState(INITIAL_VALUES);
  const [content, setContent] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  const navigate = useNavigate();

  const [sendRequest] = useApi();
  const { postId } = useParams();

  function handleChange(name, value) {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  function handleProfileImg(e) {
    const { localName: name, currentSrc: value } = e.target;
    handleChange(name, value);
  }

  function handleClearClick(e) {
    const name = "img";
    handleChange(name, defaultImg);
  }

  useEffect(() => {
    const name = "content";
    const value = content;
    handleChange(name, value);
  }, [content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(values.sender && !isEmpty)) return;

    sendRequest({
      url:
        API_INFO.baseUrl +
        putParams(API_INFO.endPoints.postRecipientsMessages.url, postId),
      method: API_INFO.endPoints.postRecipientsMessages.method,
      body: {
        team: "5-10",
        recipientId: postId,
        sender: values.sender,
        profileImageURL: values.img,
        relationship: values.relationship,
        content: values.content,
        font: values.font,
      },
      callback: () => {
        navigate(`/post/${postId}`);
      },
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormContent>
        <Label htmlFor="sender">From.</Label>
        <Input
          name="sender"
          placeholder="이름을 입력해 주세요."
          value={values.sender}
          onChange={handleInputChange}
        />
      </FormContent>

      <FormContent>
        <Label htmlFor="profile_img">프로필 이미지</Label>
        <div
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
            position: "relative",
          }}
        >
          {values.img && <ProfileImg src={values.img} alt="이미지 미리보기" />}

          {(values.img !== "") && (values.img !== defaultImg) && 
            <ResetButton onClick={handleClearClick}>X</ResetButton>
          }

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "5px",
            }}
          >
            <Description>프로필 이미지를 선택해주세요!</Description>
            <ProfileImgOptionsLayout>
              {data?.imageUrls.map(
                (img, i) =>
                  i !== 0 && (
                    <ProfileImgOptions
                      key={i}
                      src={img}
                      alt="프로필 이미지"
                      onClick={handleProfileImg}
                    />
                  ),
              )}
            </ProfileImgOptionsLayout>
          </div>
        </div>
      </FormContent>

      <FormContent>
        <Label htmlFor="relationship">상대와의 관계</Label>
        <Select
          name="relationship"
          value={values.relationship}
          onChange={handleInputChange}
        >
          <option value="지인">지인</option>
          <option value="친구">친구</option>
          <option value="동료">동료</option>
          <option value="가족">가족</option>
        </Select>
      </FormContent>

      <FormContent>
        <Label htmlFor="content">내용을 입력해 주세요</Label>
        <TextEditor
          name="content"
          value={content}
          onChange={setContent}
          setIsEmpty={setIsEmpty}
        />
      </FormContent>

      <FormContent>
        <Label htmlFor="font">폰트 선택</Label>
        <Select name="font" value={values.font} onChange={handleInputChange}>
          <option value="Noto Sans">Noto Sans</option>
          <option value="Pretendard">Pretendard</option>
          <option value="나눔명조">나눔명조</option>
          <option value="나눔손글씨 손편지체">나눔손글씨 손편지체</option>
        </Select>
      </FormContent>

      <Submit
        style={{
          marginTop: "12px",
          backgroundColor:
            values.sender && !isEmpty ? "var(--purple700)" : "var(--gray300)",
        }}
        type="submit"
        value="생성하기"
      />
    </StyledForm>
  );
}
