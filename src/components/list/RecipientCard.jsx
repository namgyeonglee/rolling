import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const RecipientInfo = styled.div`
`

function RecipientCard({ recipient }) {
  const backgroundColor = recipient.backgroundColor || "beige"
  const backgroundImage = recipient.backgroundImageURL
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/post/${recipient.id}`)
  }

  return (
    <CardWarrpper
      onClick={handleCardClick}
      $backgroundColor={backgroundColor}
      $backgroundImage={backgroundImage}
    >
      <RecipientInfo>
        <RecipientText $backgroundImage={backgroundImage}>
          To. {recipient.name}
        </RecipientText>
        <WrittenBy>
          <WrittenByIcons
            profileUrl = {recipient.recentMessages.map(
              (message) => message.profileUrl,
            )}
            peopleNum = {recipient.messageCount}
          />
        </WrittenBy>
        <WriterText $backgroundImage={backgroundImage}>
          <WriterNumText>{recipient.messageCount}</WriterNumText>명이 작성했어요!
        </WriterText>
      </RecipientInfo>
      <EmojiGroup>
        <EmojiCount>
          <Emoji></Emoji>
        </EmojiCount>
      </EmojiGroup>
    </CardWarrpper>

  )
}

export default RecipientCard
