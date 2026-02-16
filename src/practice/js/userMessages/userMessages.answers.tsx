function prepareMessages(messages: Message[], users: User[]): ExtendedMessage[] {
  const userMap: Record<string, string> = {};
  for (const u of users) userMap[u.id] = u.name;

  return messages.map((message: Message) => {
    return {
      ...message,
      userName: userMap[message.userId],
    };
  });
}
