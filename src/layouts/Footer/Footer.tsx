import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Footer = () => {
  return (
    <footer className='flex flex-col justify-end items-center flex-grow-0 flex-shrink-0 h-[422px] gap-16 px-[104px] pb-16 bg-[#8dd3bb]'>
      <div
        className='flex justify-between items-end flex-grow-0 flex-shrink-0 w-[1232px] relative overflow-hidden px-6 rounded-[20px] bg-[#cdeae1]'
        style={{ boxShadow: '0px 4px 16px 0 rgba(17,34,17,0.05)' }}
      >
        <div className='flex flex-col justify-between items-start self-stretch flex-grow-0 flex-shrink-0 relative py-6'>
          <p className='flex-grow-0 flex-shrink-0 text-[44px] font-bold text-left text-[#121]'>
            Subscribe
            <br />
            Newsletter
          </p>
          <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-4'>
            <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0  gap-2'>
              <p className='flex-grow-0 flex-shrink-0 opacity-80 text-xl font-bold text-left text-[#121]'>The Travel</p>
              <p className='flex-grow-0 flex-shrink-0 opacity-70 text-base font-medium text-left text-[#121]'>
                Get inspired! Receive travel discounts, tips and behind the scenes stories.
              </p>
            </div>
            <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 w-[593px] gap-4 min-h-max'>
              <Input
                id='email'
                type='email'
                placeholder='Email'
                className='focus:outline-none focus:ring-0 focus:border-2 focus:border-[#8DD3BB] p-2 rounded-md'
              />
              <Button className='bg-[#121] text-white hover:opacity-90'>Subscribe</Button>
            </div>
          </div>
        </div>
        <svg
          width={400}
          height={305}
          viewBox='0 0 400 305'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='flex-grow-0 flex-shrink-0 w-[400px] h-[305px] relative'
          preserveAspectRatio='xMidYMid meet'
        >
          <g clip-path='url(#clip0_1_11544)'>
            <path
              d='M157.25 376.763H239.462C240.137 376.763 240.706 374.956 240.706 372.856V121.256C240.706 119.144 240.137 117.35 239.462 117.35H157.25C156.875 117.35 156.6 117.756 156.394 118.4L156.381 118.531C156.381 118.531 156.356 118.544 156.344 118.663C156.094 119.508 155.982 120.388 156.012 121.269V372.869C156.012 374.956 156.569 376.763 157.25 376.763Z'
              fill='#DFAD92'
            />
            <path
              d='M194.437 376.763H239.994C240.381 376.763 240.687 374.956 240.687 372.856V121.256C240.687 119.144 240.375 117.35 239.994 117.35H194.444C194.237 117.35 194.081 117.756 193.981 118.4L193.969 118.531C193.969 118.531 193.956 118.544 193.944 118.663C193.803 119.524 193.742 120.396 193.762 121.269V372.869C193.762 374.956 194.062 376.763 194.437 376.763Z'
              fill='#A4806D'
            />
            <path
              d='M157.25 268.232H239.438C240.125 268.232 240.694 267.844 240.694 267.388V212.438C240.694 211.975 240.125 211.575 239.438 211.575H157.238C156.943 211.567 156.654 211.648 156.406 211.807L156.369 211.832L156.319 211.869C156.223 211.929 156.143 212.011 156.088 212.11C156.032 212.208 156.002 212.319 156 212.432V267.382C156 267.85 156.544 268.232 157.238 268.232'
              fill='#A4806D'
            />
            <path
              d='M133.688 47H63.0188C28.225 47 0 85.575 0 133.144V238.156H70.6688V133.144C70.6688 85.575 98.875 47 133.688 47Z'
              fill='#7C9C9F'
            />
            <path
              d='M298.269 47H133.687C98.875 47 70.6875 85.575 70.6875 133.144V238.156H361.294V133.144C361.294 85.575 333.081 47 298.294 47'
              fill='#112211'
            />
            <path
              d='M145.312 47H63.0312C28.2313 47 0.03125 85.575 0.03125 133.144V238.156H208.356V133.144C208.356 85.575 180.144 47 145.356 47'
              fill='#65B599'
            />
            <path
              d='M399.394 154.988C399.419 155.025 399.569 155.038 399.569 155.075V230.469C399.578 230.736 399.518 231.001 399.394 231.238C399.394 231.238 399.369 231.238 399.369 231.25H399.344C399.262 231.406 399.112 231.544 398.937 231.544H358.119C357.756 231.544 357.475 231.031 357.475 230.4V189.356H233.5C232.144 189.356 230.969 189.113 230.969 188.844V155.006C230.969 154.713 232.144 154.481 233.5 154.481H398.937C399.125 154.481 399.294 154.669 399.394 154.925'
              fill='#FF8682'
            />
            <path
              d='M140.426 59H66.5675C35.3409 59 10 95.1164 10 139.668V238H197V139.668C197 95.1164 171.683 59 140.426 59Z'
              fill='#546869'
            />
          </g>
        </svg>
      </div>
      <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 w-full gap-[140px]'>
        <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-6'>
          <svg
            width={120}
            height={40}
            viewBox='0 0 120 40'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='flex-grow-0 flex-shrink-0 w-[120px] h-[39.15px] relative'
            preserveAspectRatio='xMidYMid meet'
          >
            <g clip-path='url(#clip0_1_11557)'>
              <path
                d='M16.0157 6.06445L19.5155 8.70845L17.3775 11.4287C18.8536 13.0989 19.3976 15.0048 19.3976 17.1048C19.3976 19.475 18.5037 22.819 15.3539 24.2571C18.5418 25.8511 19.318 28.1451 19.318 30.5951C19.318 35.8831 15.2742 39.1474 9.71615 39.1474C4.15812 39.1474 0 35.7653 0 30.5951H4.70215C4.70215 33.0831 6.99604 34.7153 9.71615 34.7153C12.4363 34.7153 14.5742 33.2391 14.5742 30.5951C14.5742 27.9511 12.0863 26.7452 9.71615 26.7452C3.73192 26.7452 0 23.0928 0 17.1048C0 11.1168 4.35217 7.38472 9.71961 7.38472C11.2373 7.38472 12.7897 7.57878 14.1134 8.47281L16.0157 6.06445ZM4.70215 17.1048C4.70215 20.4488 6.95793 22.4309 9.71615 22.4309C12.4363 22.4309 14.692 20.4107 14.692 17.1048C14.692 13.7989 12.4397 11.7024 9.71961 11.7024C6.95793 11.7024 4.70215 13.7608 4.70215 17.1048Z'
                fill='#112211'
              />
              <path d='M54.9878 0V27.1746H50.2856V0H54.9878Z' fill='#112211' />
              <path
                d='M76.1179 17.6105C76.1179 23.1307 72.3479 27.6008 66.128 27.6008C59.9082 27.6008 56.1763 23.1307 56.1763 17.6105C56.1763 12.1284 59.9844 7.62012 66.0899 7.62012C72.1954 7.62012 76.1179 12.1284 76.1179 17.6105ZM60.9165 17.6105C60.9165 20.5248 62.6664 23.2485 66.1246 23.2485C69.5828 23.2485 71.3326 20.5282 71.3326 17.6105C71.3326 14.7343 69.3125 11.9344 66.1246 11.9344C62.7045 11.9344 60.9165 14.7343 60.9165 17.6105Z'
                fill='#112211'
              />
              <path
                d='M82.0467 0V10.6141C83.1729 8.63198 86.3226 7.54389 88.3428 7.54389C93.9389 7.54389 98.1005 10.9641 98.1005 17.5724C98.1005 23.8688 93.8627 27.6009 88.2284 27.6009C85.8964 27.6009 83.5263 26.8246 82.0467 24.5306L81.7348 27.1746H77.303V0H82.0467ZM82.3551 17.5724C82.3551 21.0307 84.9193 23.2104 87.9131 23.2104C90.9451 23.2104 93.3568 20.9163 93.3568 17.5724C93.3568 14.114 90.9451 11.976 87.9131 11.976C84.9227 11.9725 82.3551 14.2284 82.3551 17.5724Z'
                fill='#112211'
              />
              <path
                d='M105.152 20.9131C106.254 23.0339 108.777 23.9383 111.919 22.7948C113.562 22.1953 115.492 20.7918 116.13 19.3607L120.004 21.1349C118.822 23.7997 116.064 25.8788 113.323 26.8768C107.113 29.1362 102.027 26.6447 99.9268 20.8715C97.9309 15.393 100.221 10.0911 106.067 7.96342C112.093 5.76991 117.214 8.12629 119.217 15.7949L105.152 20.9131ZM113.6 13.6603C112.457 11.4287 110.204 10.9262 107.647 11.8549C105.235 12.7316 103.69 14.6202 103.884 17.1949L113.6 13.6603Z'
                fill='#112211'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M43.2386 13.0379C41.7013 9.83054 38.4964 7.62012 34.2213 7.62012C28.1158 7.62012 24.3076 12.1284 24.3076 17.6105C24.3076 21.1103 25.8078 24.1881 28.491 25.9722C28.6439 25.8578 28.7359 25.7835 28.7359 25.7835C30.0743 24.9103 31.3799 23.991 32.6506 23.0277C30.2567 22.3233 29.0479 20.0327 29.0479 17.6105C29.0479 14.7343 30.8393 11.9344 34.2559 11.9344C37.2647 11.9344 39.2333 14.4285 39.445 17.1269C40.7639 15.818 42.0296 14.454 43.2386 13.0379ZM33.7754 27.5917C37.5614 24.9081 41.0621 21.8426 44.2201 18.4459C43.8586 23.5747 40.1622 27.6008 34.2594 27.6008C34.0963 27.6008 33.935 27.5978 33.7754 27.5917Z'
                fill='white'
              />
              <path
                d='M47.1046 4.93451C42.2604 3.15336 38.778 6.98594 38.778 6.98594L42.0802 8.9057C43.3172 8.19532 43.8682 8.88491 44.0103 9.26262C44.1108 9.52945 43.9756 9.82053 43.8682 9.97993L43.0643 10.9953C38.726 16.2278 33.6254 20.7742 27.9322 24.489C27.9322 24.489 26.2135 25.8751 25.2987 25.8959C24.5295 25.9132 24.1864 25.2652 24.8344 24.3365L23.2404 20.7396C23.2404 20.7396 19.0927 23.4564 19.8966 28.2315C20.2362 30.2483 22.1316 31.6829 24.1448 31.319C25.174 31.1354 26.4457 30.6329 28.0015 29.6037L30.8637 27.7325C36.5568 24.0108 41.6609 19.4505 45.9958 14.211L46.9799 13.0224C48.4629 11.3349 49.1282 9.94528 49.3535 8.84679C49.7 7.16614 48.7055 5.5236 47.1046 4.93451Z'
                fill='white'
              />
            </g>
          </svg>
          <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-3'>
            <svg
              width={20}
              height={21}
              viewBox='0 0 20 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='flex-grow-0 flex-shrink-0 w-5 h-5 relative'
              preserveAspectRatio='xMidYMid meet'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M1 10.0503C1 14.5248 4.24975 18.2455 8.5 19V12.4998H6.25V10H8.5V7.99975C8.5 5.74975 9.94975 4.50025 12.0002 4.50025C12.6497 4.50025 13.3503 4.6 13.9998 4.69975V7H12.85C11.7498 7 11.5 7.54975 11.5 8.25025V10H13.9L13.5002 12.4998H11.5V19C15.7502 18.2455 19 14.5255 19 10.0503C19 5.0725 14.95 1 10 1C5.05 1 1 5.0725 1 10.0503Z'
                fill='#112211'
              />
            </svg>
            <svg
              width={20}
              height={21}
              viewBox='0 0 20 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='flex-grow-0 flex-shrink-0 w-5 h-5 relative'
              preserveAspectRatio='xMidYMid meet'
            >
              <path
                d='M19.7029 4.26112C19.0071 4.56946 18.2596 4.77779 17.4737 4.87196C18.2846 4.38678 18.8912 3.62318 19.1804 2.72362C18.4186 3.17611 17.5849 3.49462 16.7154 3.66529C16.1307 3.04101 15.3563 2.62723 14.5124 2.48818C13.6684 2.34914 12.8022 2.49262 12.0481 2.89633C11.2941 3.30005 10.6944 3.94142 10.3422 4.72088C9.99003 5.50033 9.90503 6.37425 10.1004 7.20696C8.55682 7.12945 7.04677 6.72825 5.66827 6.02938C4.28977 5.33051 3.07362 4.34959 2.09875 3.15029C1.76542 3.72529 1.57375 4.39196 1.57375 5.10196C1.57338 5.74112 1.73078 6.37049 2.03198 6.93423C2.33319 7.49797 2.76888 7.97865 3.30042 8.33362C2.68398 8.31401 2.08114 8.14744 1.54208 7.84779V7.89779C1.54202 8.79424 1.85211 9.6631 2.41974 10.357C2.98736 11.0508 3.77756 11.5269 4.65625 11.7045C4.0844 11.8592 3.48486 11.882 2.90292 11.7711C3.15083 12.5425 3.63375 13.217 4.28406 13.7002C4.93437 14.1835 5.71951 14.4513 6.52958 14.4661C5.15444 15.5456 3.45616 16.1312 1.70792 16.1286C1.39823 16.1287 1.08881 16.1106 0.78125 16.0745C2.55581 17.2154 4.62153 17.821 6.73125 17.8186C13.8729 17.8186 17.7771 11.9036 17.7771 6.77362C17.7771 6.60696 17.7729 6.43862 17.7654 6.27196C18.5248 5.72277 19.1803 5.0427 19.7013 4.26362L19.7029 4.26112Z'
                fill='#112211'
              />
            </svg>
            <svg
              width={20}
              height={21}
              viewBox='0 0 20 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='flex-grow-0 flex-shrink-0 w-5 h-5 relative'
              preserveAspectRatio='xMidYMid meet'
            >
              <g clip-path='url(#clip0_1_11565)'>
                <path
                  d='M19.5829 5.56937C19.4696 5.1654 19.249 4.79966 18.9445 4.51104C18.6314 4.21354 18.2477 4.00074 17.8295 3.89271C16.2645 3.48021 9.99454 3.48021 9.99454 3.48021C7.38065 3.45047 4.7674 3.58127 2.16954 3.87187C1.75136 3.98788 1.36834 4.20545 1.05454 4.50521C0.746204 4.80187 0.522871 5.16771 0.406204 5.56854C0.125949 7.07833 -0.0102189 8.61133 -0.000462243 10.1469C-0.0104622 11.681 0.125371 13.2135 0.406204 14.7252C0.520371 15.1244 0.742871 15.4885 1.05204 15.7827C1.3612 16.0769 1.7462 16.2894 2.16954 16.4019C3.75537 16.8135 9.99454 16.8135 9.99454 16.8135C12.6118 16.8433 15.2283 16.7125 17.8295 16.4219C18.2477 16.3138 18.6314 16.101 18.9445 15.8035C19.2489 15.515 19.4693 15.1492 19.582 14.7452C19.8696 13.236 20.0094 11.7024 19.9995 10.166C20.0212 8.62321 19.8815 7.08234 19.5829 5.56854V5.56937ZM8.0012 13.0002V7.29437L13.2179 10.1477L8.0012 13.0002Z'
                  fill='#112211'
                />
              </g>
            </svg>
            <svg
              width={20}
              height={21}
              viewBox='0 0 20 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='flex-grow-0 flex-shrink-0 w-5 h-5 relative'
              preserveAspectRatio='xMidYMid meet'
            >
              <path
                d='M9.49787 7.66546C7.93707 7.66546 6.66333 8.9392 6.66333 10.5C6.66333 12.0608 7.93707 13.3345 9.49787 13.3345C11.0587 13.3345 12.3324 12.0608 12.3324 10.5C12.3324 8.9392 11.0587 7.66546 9.49787 7.66546ZM17.9994 10.5C17.9994 9.32621 18.01 8.16305 17.9441 6.99138C17.8782 5.63046 17.5677 4.42264 16.5725 3.42747C15.5752 2.43017 14.3695 2.12184 13.0086 2.05592C11.8348 1.99 10.6717 2.00063 9.5 2.00063C8.32621 2.00063 7.16305 1.99 5.99138 2.05592C4.63046 2.12184 3.42264 2.4323 2.42747 3.42747C1.43017 4.42477 1.12184 5.63046 1.05592 6.99138C0.99 8.16517 1.00063 9.32833 1.00063 10.5C1.00063 11.6717 0.99 12.837 1.05592 14.0086C1.12184 15.3695 1.4323 16.5774 2.42747 17.5725C3.42477 18.5698 4.63046 18.8782 5.99138 18.9441C7.16517 19.01 8.32833 18.9994 9.5 18.9994C10.6738 18.9994 11.837 19.01 13.0086 18.9441C14.3695 18.8782 15.5774 18.5677 16.5725 17.5725C17.5698 16.5752 17.8782 15.3695 17.9441 14.0086C18.0121 12.837 17.9994 11.6738 17.9994 10.5ZM9.49787 14.8613C7.08437 14.8613 5.13655 12.9135 5.13655 10.5C5.13655 8.08649 7.08437 6.13868 9.49787 6.13868C11.9114 6.13868 13.8592 8.08649 13.8592 10.5C13.8592 12.9135 11.9114 14.8613 9.49787 14.8613ZM14.0378 6.97862C13.4743 6.97862 13.0193 6.52356 13.0193 5.96006C13.0193 5.39655 13.4743 4.94149 14.0378 4.94149C14.6013 4.94149 15.0564 5.39655 15.0564 5.96006C15.0565 6.09386 15.0303 6.22639 14.9792 6.35004C14.9281 6.4737 14.853 6.58605 14.7584 6.68067C14.6638 6.77528 14.5515 6.8503 14.4278 6.90143C14.3041 6.95256 14.1716 6.97879 14.0378 6.97862Z'
                fill='#112211'
              />
            </svg>
          </div>
        </div>
        <div className='flex justify-end items-start flex-grow gap-6'>
          <div className='flex flex-col justify-start items-start flex-grow relative gap-4'>
            <p className='flex-grow-0 flex-shrink-0 text-base font-bold text-left text-[#121]'>Our Destinations</p>
            <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-3'>
              <p className='flex-grow-0 flex-shrink-0 opacity-70 text-sm font-medium text-left text-[#121]'>Canada</p>
              <p className='flex-grow-0 flex-shrink-0 opacity-70 text-sm font-medium text-left text-[#121]'>Alaksa</p>
              <p className='flex-grow-0 flex-shrink-0 opacity-70 text-sm font-medium text-left text-[#121]'>France</p>
              <p className='flex-grow-0 flex-shrink-0 opacity-70 text-sm font-medium text-left text-[#121]'>Iceland</p>
            </div>
          </div>
          <div className='flex flex-col justify-start items-start flex-grow relative gap-4'>
            <p className='flex-grow-0 flex-shrink-0 text-base font-bold text-left text-[#121]'>Our Activities</p>
            <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-3'>
              <p className='flex-grow-0 flex-shrink-0  opacity-70 text-sm font-medium text-left text-[#121]'>
                Northern Lights
              </p>
              <p className='flex-grow-0 flex-shrink-0  opacity-70 text-sm font-medium text-left text-[#121]'>
                Cruising &amp; sailing
              </p>
              <p className='flex-grow-0 flex-shrink-0  opacity-70 text-sm font-medium text-left text-[#121]'>
                Multi-activities
              </p>
              <p className='flex-grow-0 flex-shrink-0  opacity-70 text-sm font-medium text-left text-[#121]'>Kayaing</p>
            </div>
          </div>
          <div className='flex flex-col justify-start items-start flex-grow relative gap-4'>
            <p className='flex-grow-0 flex-shrink-0 text-base font-bold text-left text-[#121]'>Travel Blogs</p>
            <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-3'>
              <p className='flex-grow-0 flex-shrink-0  opacity-70 text-sm font-medium text-left text-[#121]'>
                Bali Travel Guide
              </p>
              <p className='flex-grow-0 flex-shrink-0  opacity-70 text-sm font-medium text-left text-[#121]'>
                Sri Lanks Travel Guide
              </p>
              <p className='flex-grow-0 flex-shrink-0  opacity-70 text-sm font-medium text-left text-[#121]'>
                Peru Travel Guide
              </p>
              <p className='flex-grow-0 flex-shrink-0  opacity-70 text-sm font-medium text-left text-[#121]'>
                Bali Travel Guide
              </p>
            </div>
          </div>
          <div className='flex flex-col justify-start items-start flex-grow relative gap-4'>
            <p className='flex-grow-0 flex-shrink-0 text-base font-bold text-left text-[#121]'>About Us</p>
            <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-3'>
              <p className='flex-grow-0 flex-shrink-0  opacity-70 text-sm font-medium text-left text-[#121]'>
                Our Story
              </p>
              <p className='flex-grow-0 flex-shrink-0  opacity-70 text-sm font-medium text-left text-[#121]'>
                Work with us
              </p>
            </div>
          </div>
          <div className='flex flex-col justify-start items-start flex-grow relative gap-4'>
            <p className='flex-grow-0 flex-shrink-0 text-base font-bold text-left text-[#121]'>Contact Us</p>
            <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-3'>
              <p className='flex-grow-0 flex-shrink-0 opacity-70 text-sm font-medium text-left text-[#121]'>
                Our Story
              </p>
              <p className='flex-grow-0 flex-shrink-0 opacity-70 text-sm font-medium text-left text-[#121]'>
                Work with us
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
