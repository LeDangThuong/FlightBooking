import { Flight } from '@/models/Flight'

import { useEffect, useState } from 'react'
import { getAirlineByPlaneId } from '@/services/AirlineService'
import { Airline } from '@/models/Airline'
import { Plane } from '@/models/Plane'
import { getPlaneNumberByPlaneId } from '@/services/PlaneService'
import { Location } from 'react-router-dom'

interface InforAirlineProps {
  flight: Flight
  location: Location
  // onChange: (event: Event, value: number | number[], activeThumb: number) => void
}

export const InforAirline: React.FC<InforAirlineProps> = ({ flight, location }) => {
  const [airline, setAirline] = useState<Airline | null>(null)
  const [plane, setPlane] = useState<Plane | null>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [selectImage, setSelectImage] = useState<number>(0)

  const handleSelectImage = (index: number) => {
    setSelectImage(index)
  }

  const fetchAirline = async () => {
    setLoading(true)

    setAirline(await getAirlineByPlaneId(flight.planeId))
    setPlane(await getPlaneNumberByPlaneId(flight.planeId))

    console.log(plane)

    setLoading(false)
  }

  useEffect(() => {
    fetchAirline()
  }, [location])
  return (
    <div className='flex flex-col'>
      <div className='flex justify-between  '>
        <div className='flex flex-col gap-2'>
          <div className="text-neutral-900 text-2xl font-bold font-['TradeGothic LT Extended']">
            {airline?.airlineName}
          </div>

          <div className='w-[374px] h-[18px] justify-start items-center gap-1 inline-flex'>
            <div className="opacity-75 text-neutral-900 text-sm font-medium font-['Montserrat']">
              {plane?.flightNumber}
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='flex gap-3 '>
            <div className='w-12 h-12 flex-col justify-start items-start gap-2.5 inline-flex'>
              <div className='w-12 h-12 px-2 py-2 rounded border border-green-300 justify-center items-center gap-1 inline-flex'>
                <svg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M13.7863 3.625C11.2504 3.625 10.0004 6.125 10.0004 6.125C10.0004 6.125 8.7504 3.625 6.21446 3.625C4.15352 3.625 2.52149 5.34922 2.5004 7.40664C2.45743 11.6773 5.88829 14.7145 9.64884 17.2668C9.75251 17.3373 9.87501 17.3751 10.0004 17.3751C10.1258 17.3751 10.2483 17.3373 10.352 17.2668C14.1121 14.7145 17.543 11.6773 17.5004 7.40664C17.4793 5.34922 15.8473 3.625 13.7863 3.625V3.625Z'
                    stroke='#4C4850'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </div>
            </div>

            <div className='w-12 h-12 flex-col justify-start items-start gap-2.5 inline-flex'>
              <div className='w-12 h-12 px-2 py-2 rounded border border-green-300 justify-center items-center gap-1 inline-flex'>
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M13.1869 13.9151L13.2028 13.924L13.2154 13.9109C13.4459 13.6698 13.7229 13.478 14.0296 13.347C14.3364 13.216 14.6665 13.1485 15 13.1486C15.5172 13.1486 16.0215 13.3105 16.4421 13.6116C16.8626 13.9127 17.1783 14.338 17.3449 14.8277C17.5114 15.3174 17.5205 15.8469 17.3707 16.342C17.221 16.8371 16.9201 17.2729 16.5101 17.5883C16.1001 17.9036 15.6016 18.0826 15.0847 18.1003C14.5677 18.1179 14.0582 17.9733 13.6277 17.6866C13.1972 17.4 12.8672 16.9857 12.684 16.502C12.5009 16.0182 12.4739 15.4893 12.6066 14.9894L12.6113 14.9718L12.5955 14.9629L6.81423 11.7102L6.7984 11.7013L6.78582 11.7144C6.44373 12.0711 6.00274 12.3173 5.51958 12.4213C5.03642 12.5253 4.5332 12.4823 4.07465 12.298C3.61609 12.1136 3.22319 11.7963 2.94647 11.3868C2.66975 10.9773 2.52188 10.4944 2.52188 10.0002C2.52188 9.50595 2.66975 9.02303 2.94647 8.61353C3.22319 8.20404 3.61609 7.88671 4.07465 7.70235C4.5332 7.518 5.03642 7.47506 5.51958 7.57906C6.00274 7.68305 6.44373 7.92923 6.78582 8.28592L6.7984 8.29903L6.81423 8.29013L12.5955 5.03739L12.6113 5.02848L12.6066 5.01093C12.452 4.43047 12.5143 3.81355 12.7819 3.27574C13.0495 2.73794 13.504 2.31615 14.0603 2.08939C14.6165 1.86263 15.2364 1.84647 15.8037 2.04393C16.371 2.24138 16.8469 2.63891 17.1422 3.16204C17.4374 3.68517 17.5318 4.29801 17.4076 4.88574C17.2835 5.47347 16.9493 5.99577 16.4677 6.35479C15.9861 6.71381 15.3901 6.88492 14.7914 6.83606C14.1927 6.7872 13.6323 6.52172 13.2153 6.08937L13.2027 6.07633L13.1869 6.08521L7.4057 9.33795L7.38987 9.34685L7.39454 9.3644C7.50548 9.78099 7.50548 10.2193 7.39454 10.6359L7.38987 10.6535L7.4057 10.6624L13.1869 13.9151Z'
                    fill='black'
                    stroke='#112211'
                    stroke-width='0.046875'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img className='w-[1232px] my-5 h-[395px] rounded-xl object-cover ' src={airline?.picture[selectImage]} />

      <div className='flex gap-5 my-5 overflow-x-auto whitespace-nowrap'>
        {airline &&
          airline.picture.map((item, index) => (
            <img
              key={index}
              className={
                selectImage === index
                  ? 'w-[120px] h-[120px]  rounded-xl object-cover border-4 border-green-300'
                  : 'w-[120px] h-[120px]  rounded-xl object-cover'
              }
              src={item}
              onClick={() => handleSelectImage(index)}
            />
          ))}
      </div>

      <div className='flex flex-col p-4 bg-green-300 bg-opacity-60 rounded-lg gap-3  my-4'>
        <div className="text-neutral-900 text-2xl font-bold font-['TradeGothic LT Extended']">
          Emirates Airlines Policies
        </div>
        <div className='flex gap-10'>
          <div className='flex '>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 13.5C12.4142 13.5 12.75 13.1642 12.75 12.75C12.75 12.3358 12.4142 12 12 12C11.5858 12 11.25 12.3358 11.25 12.75C11.25 13.1642 11.5858 13.5 12 13.5Z'
                fill='#112211'
              />
              <path
                d='M13.125 3.82031V3.375C13.125 3.07663 13.0065 2.79048 12.7955 2.5795C12.5845 2.36853 12.2984 2.25 12 2.25C11.7016 2.25 11.4155 2.36853 11.2045 2.5795C10.9935 2.79048 10.875 3.07663 10.875 3.375V3.82031C9.45433 3.99866 8.09716 4.51513 6.91735 5.32641L6.42188 4.82812C6.21053 4.61678 5.92389 4.49805 5.625 4.49805C5.32612 4.49805 5.03947 4.61678 4.82813 4.82812C4.61678 5.03947 4.49805 5.32611 4.49805 5.625C4.49805 5.92389 4.61678 6.21053 4.82813 6.42188L5.23125 6.825C3.79135 8.46272 2.99805 10.5693 3 12.75C3 17.7127 7.03735 21.75 12 21.75C16.9627 21.75 21 17.7127 21 12.75C21 8.16844 17.5584 4.37531 13.125 3.82031ZM12 15C11.4694 14.9998 10.9558 14.8121 10.5502 14.4701C10.1445 14.128 9.87279 13.6535 9.78305 13.1305C9.69331 12.6075 9.79131 12.0696 10.0597 11.6118C10.3282 11.1541 10.7498 10.8059 11.25 10.6289V7.125C11.25 6.92609 11.329 6.73532 11.4697 6.59467C11.6103 6.45402 11.8011 6.375 12 6.375C12.1989 6.375 12.3897 6.45402 12.5303 6.59467C12.671 6.73532 12.75 6.92609 12.75 7.125V10.6289C13.2503 10.8059 13.6718 11.1541 13.9403 11.6118C14.2087 12.0696 14.3067 12.6075 14.217 13.1305C14.1272 13.6535 13.8555 14.128 13.4498 14.4701C13.0442 14.8121 12.5307 14.9998 12 15Z'
                fill='#112211'
              />
            </svg>

            <div className="grow shrink basis-0 opacity-75 text-neutral-900 text-base font-medium font-['Montserrat']">
              Pre-flight cleaning, installation of cabin HEPA filters.
            </div>
          </div>
          <div className='flex '>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 13.5C12.4142 13.5 12.75 13.1642 12.75 12.75C12.75 12.3358 12.4142 12 12 12C11.5858 12 11.25 12.3358 11.25 12.75C11.25 13.1642 11.5858 13.5 12 13.5Z'
                fill='#112211'
              />
              <path
                d='M13.125 3.82031V3.375C13.125 3.07663 13.0065 2.79048 12.7955 2.5795C12.5845 2.36853 12.2984 2.25 12 2.25C11.7016 2.25 11.4155 2.36853 11.2045 2.5795C10.9935 2.79048 10.875 3.07663 10.875 3.375V3.82031C9.45433 3.99866 8.09716 4.51513 6.91735 5.32641L6.42188 4.82812C6.21053 4.61678 5.92389 4.49805 5.625 4.49805C5.32612 4.49805 5.03947 4.61678 4.82813 4.82812C4.61678 5.03947 4.49805 5.32611 4.49805 5.625C4.49805 5.92389 4.61678 6.21053 4.82813 6.42188L5.23125 6.825C3.79135 8.46272 2.99805 10.5693 3 12.75C3 17.7127 7.03735 21.75 12 21.75C16.9627 21.75 21 17.7127 21 12.75C21 8.16844 17.5584 4.37531 13.125 3.82031ZM12 15C11.4694 14.9998 10.9558 14.8121 10.5502 14.4701C10.1445 14.128 9.87279 13.6535 9.78305 13.1305C9.69331 12.6075 9.79131 12.0696 10.0597 11.6118C10.3282 11.1541 10.7498 10.8059 11.25 10.6289V7.125C11.25 6.92609 11.329 6.73532 11.4697 6.59467C11.6103 6.45402 11.8011 6.375 12 6.375C12.1989 6.375 12.3897 6.45402 12.5303 6.59467C12.671 6.73532 12.75 6.92609 12.75 7.125V10.6289C13.2503 10.8059 13.6718 11.1541 13.9403 11.6118C14.2087 12.0696 14.3067 12.6075 14.217 13.1305C14.1272 13.6535 13.8555 14.128 13.4498 14.4701C13.0442 14.8121 12.5307 14.9998 12 15Z'
                fill='#112211'
              />
            </svg>

            <div className="grow shrink basis-0 opacity-75 text-neutral-900 text-base font-medium font-['Montserrat']">
              Pre-flight cleaning, installation of cabin HEPA filters.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
