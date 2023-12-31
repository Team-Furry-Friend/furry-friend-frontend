import { privacies } from '@/datas/policy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관',
  openGraph: {
    title: '이용약관',
  },
  twitter: {
    title: '이용약관',
  },
};

const Page = () => {
  return (
    <div className='center'>
      <h2 className='font-bold text-2xl my-8'>이용약관</h2>

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
