import { privacies } from '@/datas/policy';

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto p-2 md:p-4'>
      <h2 className='font-bold text-2xl my-8'>이용약관</h2>

      <div className='bg-gray-200 p-2 rounded'>
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
