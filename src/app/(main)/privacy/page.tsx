import { privacies } from '@/datas/policy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  openGraph: {
    title: '개인정보처리방침',
  },
  twitter: {
    title: '개인정보처리방침',
  },
};

const Page = () => {
  return (
    <div className='center'>
      <h2 className='font-bold text-2xl my-8'>개인정보 처리방침</h2>

      <div className='bg-gray-200 dark:bg-gray-600 p-2 rounded'>
        <ul className='flex flex-col gap-8'>
          {privacies.map(policy => (
            <li key={policy.title}>
              <h3 className='font-bold text-xl mb-4'>{policy.title}</h3>

              <ul>
                {policy.contents.map(content => (
                  <li key={content.text} className='pl-4 mb-4'>
                    <h4>{content.text}</h4>

                    {content.items && (
                      <ul>
                        {content.items.map(item => (
                          <li key={item.text} className='pl-4'>
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
