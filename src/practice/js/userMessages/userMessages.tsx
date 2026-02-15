// Implement the prepareMessages function
// that returns a new array of messages
// with an added userName field mapped from the users array

type ExtendedMessage = Message & {
  userName: string;
};

type Message = {
  messageId: string;
  text: string;
  userId: string;
};
type User = {
  id: string;
  name: string;
};
// Example input
const messages: Message[] = [
  { messageId: '4hh3', text: 'Hello', userId: 'user#5' },
  { messageId: 'daad', text: 'Test', userId: 'user#23' },
  { messageId: 'qw56', text: 'Thanks', userId: 'user#1' },
];
const users: User[] = [
  { id: 'user#5', name: 'Viktor' },
  { id: 'user#23', name: 'Alex' },
  { id: 'user#50', name: 'Sitta' },
];

// Expected output
const messagesWithUsernames = [
  { messageId: '4hh3', text: 'Hello', userId: 'user#5', userName: 'Viktor' },
];

// TODO: Implement the function here

function prepareMessages(messages: Message[], users: User[]): ExtendedMessage[] {}
//

export const MessagesComponent = () => {
  const prepared = prepareMessages(messages, users);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Messages</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Implement the{' '}
          <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs font-mono">
            prepareMessages
          </code>{' '}
          function that takes an array of messages and an array of users, and returns a new array of
          messages with an added{' '}
          <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs font-mono">
            userName
          </code>{' '}
          field.
        </p>
        <div className="mt-3 flex gap-4 text-xs">
          <pre className="flex-1 rounded-lg border border-gray-200 dark:border-gray-800 p-3 overflow-auto">
            <span className="text-gray-400">// input messages{'\n'}</span>
            {JSON.stringify(messages, null, 2)}
          </pre>
          <pre className="flex-1 rounded-lg border border-gray-200 dark:border-gray-800 p-3 overflow-auto">
            <span className="text-gray-400">// input users{'\n'}</span>
            {JSON.stringify(users, null, 2)}
          </pre>
          <pre className="flex-1 rounded-lg border border-gray-200 dark:border-gray-800 p-3 overflow-auto">
            <span className="text-gray-400">
              // example of {'\n'}expected output{'\n'}
            </span>
            {JSON.stringify(messagesWithUsernames, null, 2)}
          </pre>
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Result
        </h2>

        {prepared && prepared.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                  <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">
                    Text
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">
                    User ID
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">
                    User Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {prepared.map((message) => (
                  <tr
                    key={message.messageId}
                    className="border-b last:border-b-0 border-gray-200 dark:border-gray-800"
                  >
                    <td className="px-4 py-2 font-mono text-xs text-gray-600 dark:text-gray-300">
                      {message.messageId}
                    </td>
                    <td className="px-4 py-2">{message.text}</td>
                    <td className="px-4 py-2 font-mono text-xs text-gray-600 dark:text-gray-300">
                      {message.userId}
                    </td>
                    <td className="px-4 py-2 font-semibold">
                      {message.userName ?? (
                        <span className="text-gray-400 italic font-normal">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 px-4 py-6 text-center text-sm text-gray-400 dark:text-gray-500">
            Function is not yet implemented — table is empty.
          </p>
        )}
      </section>
    </div>
  );
};
