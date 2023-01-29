import { List, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import { Message } from '../../data/messages'
import { MessagesGroup, MessagesGroupProps } from './MessageGroup'

export type MessagesListProps = {
  messages: Message[]
}

export const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  const messageGroups = groupMessages(messages).reverse()
  return (
    <List spacing={3} flex='1' overflowY='auto' display='flex' flexDirection='column-reverse' m='6px'>
      {messageGroups.length === 0 ? (
        <EmptyRow />
      ) : (
        messageGroups.map((params, index) => <MessagesGroup key={`group-${index}`} {...params} />)
      )}
    </List>
  )
}

const groupMessages = (messages: Message[]): MessagesGroupProps[] => {
  const sameGroup = (msg1: Message, msg2: Message): boolean =>
    msg1.authorId === msg2.authorId && msg1.recipientId === msg2.recipientId

  return messages.reduce((groups: MessagesGroupProps[], message: Message) => {
    const currentGroup = groups[groups.length - 1]
    const lastMessage = currentGroup?.messages[0]
    if (lastMessage && sameGroup(message, lastMessage)) {
      currentGroup.messages.push(message)
    } else {
      groups.push({
        authorId: message.authorId,
        messages: [message],
      })
    }
    return groups
  }, [])
}

const EmptyRow = () => (
  <ListItem>
    <Text as='em' fontSize='sm'>
      Be the first person to say something
    </Text>
  </ListItem>
)
