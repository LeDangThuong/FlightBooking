import React, { useRef, useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import TicketItem from '../components/TicketItem'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import defaultAvatar from '../../../assets/images/default_avatar.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { format } from 'date-fns'
import { getUserByUsername, uploadNewAvatar, userChangeInfor } from '@/services/UserService'
import { setCurrentUser } from '@/redux/slice/userSlice'
import { DayPicker } from 'react-day-picker'
import { cn } from '@/lib/utils'

const ProfilePage = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const [isEditingName, setIsEditingName] = useState(false)
  const [newName, setNewName] = useState(currentUser?.fullName || '')

  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false)
  const [newPhoneNumber, setNewPhoneNumber] = useState(currentUser?.phoneNumber || '')

  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [newAddress, setNewAddress] = useState(currentUser?.address || '')

  const [isEditingPersonalId, setIsEditingPersonalId] = useState(false)
  const [newPersonalId, setNewPersonalId] = useState(currentUser?.personalId || '')

  const [isEditing, setIsEditing] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    currentUser?.dayOfBirth ? new Date(currentUser.dayOfBirth) : undefined
  )
  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    if (selectedDate) {
      try {
        const success = await userChangeInfor(
          token!,
          currentUser?.fullName ?? 'string',
          selectedDate,
          currentUser?.gender ?? 'string',
          currentUser?.address ?? 'string',
          currentUser?.phoneNumber ?? 'string',
          currentUser?.personalId ?? 'string'
        )
        if (success) {
          dispatch(setCurrentUser(await getUserByUsername(currentUser?.username!)))
        }
      } catch (error) {
        console.log(error)
      }
    }
    setIsEditing(false)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setSelectedDate(currentUser!.dayOfBirth ? new Date(currentUser!.dayOfBirth) : undefined)
  }

  const dispatch = useDispatch()

  const token = localStorage.getItem('tokenAccess')

  const handleEditNameClick = () => {
    setIsEditingName(true)
  }
  const handleEditPhoneNumberClick = () => {
    setIsEditingPhoneNumber(true)
  }
  const handleEditAddressClick = () => {
    setIsEditingAddress(true)
  }
  const handleEditPersonalIdClick = () => {
    setIsEditingPersonalId(true)
  }

  const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value)
  }
  const handleInputPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhoneNumber(e.target.value)
  }
  const handleInputAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress(e.target.value)
  }
  const handleInputPersonalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPersonalId(e.target.value)
  }

  const handleSaveNameClick = async () => {
    try {
      const success = await userChangeInfor(
        token!,
        newName,
        currentUser?.dayOfBirth!,
        currentUser?.gender ?? 'string',
        currentUser?.address ?? 'string',
        currentUser?.phoneNumber ?? 'string',
        currentUser?.personalId ?? 'string'
      )
      if (success) {
        dispatch(setCurrentUser(await getUserByUsername(currentUser?.username!)))
      }
    } catch (error) {
      console.log(error)
    }

    setIsEditingName(false)
  }

  const handleSavePhoneNumberClick = async () => {
    try {
      const success = await userChangeInfor(
        token!,
        currentUser?.fullName ?? 'string',
        currentUser?.dayOfBirth!,
        currentUser?.gender ?? 'string',
        currentUser?.address ?? 'string',
        newPhoneNumber,
        currentUser?.personalId ?? 'string'
      )
      if (success) {
        dispatch(setCurrentUser(await getUserByUsername(currentUser?.username!)))
      }
    } catch (error) {
      console.log(error)
    }

    setIsEditingPhoneNumber(false)
  }
  const handleSaveAddressClick = async () => {
    try {
      const success = await userChangeInfor(
        token!,
        currentUser?.fullName ?? 'string',
        currentUser?.dayOfBirth!,
        currentUser?.gender ?? 'string',
        newAddress,
        currentUser?.phoneNumber ?? 'string',
        currentUser?.personalId ?? 'string'
      )
      if (success) {
        dispatch(setCurrentUser(await getUserByUsername(currentUser?.username!)))
      }
    } catch (error) {
      console.log(error)
    }

    setIsEditingAddress(false)
  }

  const handleSavePersonalIdClick = async () => {
    try {
      const success = await userChangeInfor(
        token!,
        currentUser?.fullName ?? 'string',
        currentUser?.dayOfBirth!,
        currentUser?.gender ?? 'string',
        currentUser?.address ?? 'string',
        currentUser?.phoneNumber ?? 'string',
        newPersonalId
      )
      if (success) {
        dispatch(setCurrentUser(await getUserByUsername(currentUser?.username!)))
      }
    } catch (error) {
      console.log(error)
    }

    setIsEditingPersonalId(false)
  }
  const handleCancelNameClick = () => {
    setNewName(currentUser?.fullName || '')
    setIsEditingName(false)
  }
  const handleCancelPhoneNumberClick = () => {
    setNewPhoneNumber(currentUser?.phoneNumber || '')
    setIsEditingPhoneNumber(false)
  }

  const handleCancelAddressClick = () => {
    setNewAddress(currentUser?.address || '')
    setIsEditingAddress(false)
  }
  const handleCancelPersonalIdClick = () => {
    setNewPersonalId(currentUser?.personalId || '')
    setIsEditingPersonalId(false)
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('initial_image_url.jpg')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setSelectedFile(file)
      setImageUrl(URL.createObjectURL(file)) // Update the image URL to the new file
      handleUpload(file)
    }
  }

  const handleUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('avatarFile', file)

    console.log(file)

    try {
      const success = await uploadNewAvatar(token!, formData)
      if (success) {
        dispatch(setCurrentUser(await getUserByUsername(currentUser?.username!)))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=' flex flex-col overflow-hidden mx-24 my-auto'>
      <div className={`relative w-full h-80 bg-[url('@/assets/images/profileBackground.jpg')] rounded-lg bg-cover`}>
        <div className='flex flex-col w-full justify-center items-center absolute top-3/4 gap-2'>
          <Avatar className='border-4 w-32 h-32  cursor-pointer ' onClick={() => fileInputRef.current?.click()}>
            <AvatarImage src={currentUser?.avatarUrl ?? defaultAvatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <input type='file' ref={fileInputRef} onChange={handleFileChange} className='hidden' />
          <span className="  font-['Montserrat'] text-[24px] font-semibold  text-[#112211]  ">
            {currentUser?.fullName}
          </span>
          <span className="  font-['Montserrat'] text-[16px] font-normal opacity-75  text-[#112211]  ">
            {currentUser?.email}
          </span>
        </div>
      </div>

      <Tabs defaultValue='account' className='w-full mt-32'>
        <TabsList className='w-full shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] py-10'>
          <TabsTrigger value='account' className={`w-1/3 font-['Montserrat'] text-[16px] font-semibold text-[#112211]`}>
            Account
          </TabsTrigger>
          <TabsTrigger value='tickets' className={`w-1/3 font-['Montserrat'] text-[16px] font-semibold text-[#112211]`}>
            Tickets/Bookings
          </TabsTrigger>
          <TabsTrigger value='payment' className={`w-1/3 font-['Montserrat'] text-[16px] font-semibold text-[#112211]`}>
            Payment Method
          </TabsTrigger>
        </TabsList>
        <TabsContent value='account' className='mb-8'>
          <div className='flex w-full flex-col gap-4 items-start'>
            <span className=" font-['TradeGothic_LT_Extended'] text-[32px] font-bold  text-[#000] mt-2">Account</span>
            <div className='flex w-full py-8 px-6 flex-col gap-8 items-start  flex-nowrap bg-white rounded-2xl  shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] overflow-x-visible'>
              <div className='flex justify-between items-center self-stretch shrink-0 flex-nowrap '>
                <div className='flex flex-col gap-2 items-start shrink-0 flex-nowrap'>
                  <span className=" font-['Montserrat'] text-base font-normal opacity-75  text-[#112211]   whitespace-nowrap ">
                    Name
                  </span>
                  {isEditingName ? (
                    <input
                      type='text'
                      value={newName}
                      onChange={handleInputNameChange}
                      className="font-['Montserrat'] w-[500px] text-[20px] font-semibold text-[#112211] border border-gray-300 rounded p-1"
                    />
                  ) : (
                    <span className="font-['Montserrat'] text-[20px] font-semibold text-[#112211]">
                      {currentUser?.fullName}
                    </span>
                  )}
                </div>

                {isEditingName ? (
                  <div className='flex gap-2'>
                    <Button
                      className='border-solid border-emerald-500 border-[1px] flex gap-2 p-1 px-3'
                      onClick={handleSaveNameClick}
                    >
                      Save
                    </Button>
                    <Button
                      className='border-solid border-red-500 border-[1px] flex gap-2 p-1 px-3'
                      onClick={handleCancelNameClick}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    className='border-solid border-emerald-500 border-[1px] flex gap-2'
                    onClick={handleEditNameClick}
                  >
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M14.3559 1.67988L14.3558 1.67985C14.3123 1.63202 14.2595 1.59351 14.2007 1.56665C14.1419 1.53979 14.0782 1.52514 14.0135 1.52358C13.9489 1.52202 13.8846 1.53358 13.8245 1.55757C13.7645 1.58157 13.7099 1.61749 13.6641 1.66316L13.6641 1.66318L13.2776 2.04783C13.2351 2.09031 13.2112 2.14792 13.2112 2.20798C13.2112 2.26803 13.2351 2.32563 13.2775 2.36812C13.2775 2.36812 13.2775 2.36812 13.2776 2.36813L13.6319 2.72186L13.632 2.72191C13.653 2.74306 13.678 2.75985 13.7056 2.7713C13.7331 2.78275 13.7627 2.78864 13.7925 2.78864C13.8224 2.78864 13.8519 2.78275 13.8795 2.7713C13.907 2.75985 13.9321 2.74306 13.9531 2.72191L13.9532 2.72183L14.33 2.34686L14.3301 2.34683M14.3559 1.67988L14.3732 1.66407C14.555 1.86313 14.5372 2.17313 14.3466 2.36345L14.3301 2.34683M14.3559 1.67988C14.5287 1.86901 14.5124 2.16473 14.3301 2.34683M14.3559 1.67988L14.3301 2.34683M6.85472 8.46035L6.8547 8.46037C6.82335 8.49159 6.80056 8.53036 6.78853 8.57294L6.78822 8.57404L6.78819 8.57403L6.5274 9.3508C6.52245 9.36773 6.52213 9.38568 6.52647 9.40278C6.53085 9.42001 6.53979 9.43574 6.55236 9.44831C6.56493 9.46088 6.58066 9.46983 6.59789 9.4742C6.61499 9.47854 6.63294 9.47822 6.64987 9.47328L7.42601 9.21248L7.4271 9.21212L7.4271 9.21214C7.46969 9.20011 7.50846 9.17732 7.53968 9.14597L7.5397 9.14595L13.1709 3.50415C13.1709 3.50414 13.1709 3.50412 13.1709 3.50411C13.2186 3.45585 13.2454 3.3907 13.2454 3.32282C13.2454 3.25494 13.2187 3.1898 13.1709 3.14154L6.85472 8.46035ZM6.85472 8.46035L12.496 2.82911C12.5443 2.78091 12.6098 2.75385 12.678 2.75385C12.7463 2.75385 12.8117 2.78091 12.8601 2.82911L13.1709 3.14149L6.85472 8.46035Z'
                        fill='black'
                        stroke='#4C4850'
                        stroke-width='0.046875'
                      />
                      <path
                        d='M12.0731 6.05188L8.26406 9.86844C8.11684 10.016 7.9359 10.1255 7.73688 10.1875L6.9275 10.4584C6.73542 10.5127 6.53234 10.5147 6.3392 10.4644C6.14606 10.414 5.96985 10.313 5.82871 10.1719C5.68758 10.0308 5.58662 9.85456 5.53626 9.66142C5.4859 9.46828 5.48794 9.26521 5.54219 9.07312L5.81313 8.26375C5.87492 8.06478 5.98421 7.88385 6.13156 7.73656L9.94812 3.92688C9.98311 3.89193 10.0069 3.8474 10.0166 3.7989C10.0263 3.75041 10.0214 3.70014 10.0025 3.65445C9.98357 3.60875 9.95154 3.56969 9.91044 3.5422C9.86934 3.51471 9.82101 3.50002 9.77156 3.5H3.25C2.78587 3.5 2.34075 3.68437 2.01256 4.01256C1.68437 4.34075 1.5 4.78587 1.5 5.25V12.75C1.5 13.2141 1.68437 13.6592 2.01256 13.9874C2.34075 14.3156 2.78587 14.5 3.25 14.5H10.75C11.2141 14.5 11.6592 14.3156 11.9874 13.9874C12.3156 13.6592 12.5 13.2141 12.5 12.75V6.22844C12.5 6.17899 12.4853 6.13066 12.4578 6.08956C12.4303 6.04846 12.3912 6.01643 12.3456 5.99753C12.2999 5.97864 12.2496 5.97371 12.2011 5.98338C12.1526 5.99306 12.1081 6.01689 12.0731 6.05188Z'
                        fill='black'
                      />
                    </svg>
                    Change
                  </Button>
                )}
              </div>
              <div className='flex justify-between items-center self-stretch  flex-nowrap'>
                <div className='flex flex-col gap-[8px] items-start  flex-nowrap '>
                  <span className=" font-['Montserrat'] text-base font-normal opacity-75  text-[#112211] ">Email</span>
                  <span className=" font-['Montserrat'] text-[20px] font-semibold  text-[#112211] ">
                    {currentUser?.email}
                  </span>
                </div>
              </div>

              <div className='flex justify-between items-center self-stretch  flex-nowrap '>
                <div className='flex  flex-col gap-[8px] items-start  flex-nowrap '>
                  <span className=" font-['Montserrat'] text-base font-normal opacity-75  text-[#112211] ">
                    Phone number
                  </span>
                  {isEditingPhoneNumber ? (
                    <input
                      type='text'
                      value={newPhoneNumber}
                      onChange={handleInputPhoneNumberChange}
                      className="font-['Montserrat'] w-[500px] text-[20px] font-semibold text-[#112211] border border-gray-300 rounded p-1"
                    />
                  ) : (
                    <span className=" font-['Montserrat'] text-[20px] font-semibold  text-[#112211] ">
                      {currentUser?.phoneNumber === 'string' || currentUser?.phoneNumber === null
                        ? 'Not set'
                        : currentUser?.phoneNumber}
                    </span>
                  )}
                </div>
                {isEditingPhoneNumber ? (
                  <div className='flex gap-2'>
                    <Button
                      className='border-solid border-emerald-500 border-[1px] flex gap-2 p-1 px-3'
                      onClick={handleSavePhoneNumberClick}
                    >
                      Save
                    </Button>
                    <Button
                      className='border-solid border-red-500 border-[1px] flex gap-2 p-1 px-3'
                      onClick={handleCancelPhoneNumberClick}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    className='border-solid border-emerald-500 border-[1px] flex gap-2'
                    onClick={handleEditPhoneNumberClick}
                  >
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M14.3559 1.67988L14.3558 1.67985C14.3123 1.63202 14.2595 1.59351 14.2007 1.56665C14.1419 1.53979 14.0782 1.52514 14.0135 1.52358C13.9489 1.52202 13.8846 1.53358 13.8245 1.55757C13.7645 1.58157 13.7099 1.61749 13.6641 1.66316L13.6641 1.66318L13.2776 2.04783C13.2351 2.09031 13.2112 2.14792 13.2112 2.20798C13.2112 2.26803 13.2351 2.32563 13.2775 2.36812C13.2775 2.36812 13.2775 2.36812 13.2776 2.36813L13.6319 2.72186L13.632 2.72191C13.653 2.74306 13.678 2.75985 13.7056 2.7713C13.7331 2.78275 13.7627 2.78864 13.7925 2.78864C13.8224 2.78864 13.8519 2.78275 13.8795 2.7713C13.907 2.75985 13.9321 2.74306 13.9531 2.72191L13.9532 2.72183L14.33 2.34686L14.3301 2.34683M14.3559 1.67988L14.3732 1.66407C14.555 1.86313 14.5372 2.17313 14.3466 2.36345L14.3301 2.34683M14.3559 1.67988C14.5287 1.86901 14.5124 2.16473 14.3301 2.34683M14.3559 1.67988L14.3301 2.34683M6.85472 8.46035L6.8547 8.46037C6.82335 8.49159 6.80056 8.53036 6.78853 8.57294L6.78822 8.57404L6.78819 8.57403L6.5274 9.3508C6.52245 9.36773 6.52213 9.38568 6.52647 9.40278C6.53085 9.42001 6.53979 9.43574 6.55236 9.44831C6.56493 9.46088 6.58066 9.46983 6.59789 9.4742C6.61499 9.47854 6.63294 9.47822 6.64987 9.47328L7.42601 9.21248L7.4271 9.21212L7.4271 9.21214C7.46969 9.20011 7.50846 9.17732 7.53968 9.14597L7.5397 9.14595L13.1709 3.50415C13.1709 3.50414 13.1709 3.50412 13.1709 3.50411C13.2186 3.45585 13.2454 3.3907 13.2454 3.32282C13.2454 3.25494 13.2187 3.1898 13.1709 3.14154L6.85472 8.46035ZM6.85472 8.46035L12.496 2.82911C12.5443 2.78091 12.6098 2.75385 12.678 2.75385C12.7463 2.75385 12.8117 2.78091 12.8601 2.82911L13.1709 3.14149L6.85472 8.46035Z'
                        fill='black'
                        stroke='#4C4850'
                        stroke-width='0.046875'
                      />
                      <path
                        d='M12.0731 6.05188L8.26406 9.86844C8.11684 10.016 7.9359 10.1255 7.73688 10.1875L6.9275 10.4584C6.73542 10.5127 6.53234 10.5147 6.3392 10.4644C6.14606 10.414 5.96985 10.313 5.82871 10.1719C5.68758 10.0308 5.58662 9.85456 5.53626 9.66142C5.4859 9.46828 5.48794 9.26521 5.54219 9.07312L5.81313 8.26375C5.87492 8.06478 5.98421 7.88385 6.13156 7.73656L9.94812 3.92688C9.98311 3.89193 10.0069 3.8474 10.0166 3.7989C10.0263 3.75041 10.0214 3.70014 10.0025 3.65445C9.98357 3.60875 9.95154 3.56969 9.91044 3.5422C9.86934 3.51471 9.82101 3.50002 9.77156 3.5H3.25C2.78587 3.5 2.34075 3.68437 2.01256 4.01256C1.68437 4.34075 1.5 4.78587 1.5 5.25V12.75C1.5 13.2141 1.68437 13.6592 2.01256 13.9874C2.34075 14.3156 2.78587 14.5 3.25 14.5H10.75C11.2141 14.5 11.6592 14.3156 11.9874 13.9874C12.3156 13.6592 12.5 13.2141 12.5 12.75V6.22844C12.5 6.17899 12.4853 6.13066 12.4578 6.08956C12.4303 6.04846 12.3912 6.01643 12.3456 5.99753C12.2999 5.97864 12.2496 5.97371 12.2011 5.98338C12.1526 5.99306 12.1081 6.01689 12.0731 6.05188Z'
                        fill='black'
                      />
                    </svg>
                    Change
                  </Button>
                )}
              </div>
              <div className='flex justify-between items-center self-stretch  flex-nowrap '>
                <div className='flex  flex-col gap-[8px] items-start  flex-nowrap '>
                  <span className=" font-['Montserrat'] text-base font-normal opacity-75  text-[#112211] ">
                    Address
                  </span>
                  {isEditingAddress ? (
                    <input
                      type='text'
                      value={newAddress}
                      onChange={handleInputAddressChange}
                      className="font-['Montserrat'] w-[500px] text-[20px] font-semibold text-[#112211] border border-gray-300 rounded p-1"
                    />
                  ) : (
                    <span className=" font-['Montserrat'] text-[20px] font-semibold  text-[#112211] ">
                      {currentUser?.address === 'string' || currentUser?.address === null
                        ? 'Not set'
                        : currentUser?.address}
                    </span>
                  )}
                </div>
                {isEditingAddress ? (
                  <div className='flex gap-2'>
                    <Button
                      className='border-solid border-emerald-500 border-[1px] flex gap-2 p-1 px-3'
                      onClick={handleSaveAddressClick}
                    >
                      Save
                    </Button>
                    <Button
                      className='border-solid border-red-500 border-[1px] flex gap-2 p-1 px-3'
                      onClick={handleCancelAddressClick}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    className='border-solid border-emerald-500 border-[1px] flex gap-2'
                    onClick={handleEditAddressClick}
                  >
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M14.3559 1.67988L14.3558 1.67985C14.3123 1.63202 14.2595 1.59351 14.2007 1.56665C14.1419 1.53979 14.0782 1.52514 14.0135 1.52358C13.9489 1.52202 13.8846 1.53358 13.8245 1.55757C13.7645 1.58157 13.7099 1.61749 13.6641 1.66316L13.6641 1.66318L13.2776 2.04783C13.2351 2.09031 13.2112 2.14792 13.2112 2.20798C13.2112 2.26803 13.2351 2.32563 13.2775 2.36812C13.2775 2.36812 13.2775 2.36812 13.2776 2.36813L13.6319 2.72186L13.632 2.72191C13.653 2.74306 13.678 2.75985 13.7056 2.7713C13.7331 2.78275 13.7627 2.78864 13.7925 2.78864C13.8224 2.78864 13.8519 2.78275 13.8795 2.7713C13.907 2.75985 13.9321 2.74306 13.9531 2.72191L13.9532 2.72183L14.33 2.34686L14.3301 2.34683M14.3559 1.67988L14.3732 1.66407C14.555 1.86313 14.5372 2.17313 14.3466 2.36345L14.3301 2.34683M14.3559 1.67988C14.5287 1.86901 14.5124 2.16473 14.3301 2.34683M14.3559 1.67988L14.3301 2.34683M6.85472 8.46035L6.8547 8.46037C6.82335 8.49159 6.80056 8.53036 6.78853 8.57294L6.78822 8.57404L6.78819 8.57403L6.5274 9.3508C6.52245 9.36773 6.52213 9.38568 6.52647 9.40278C6.53085 9.42001 6.53979 9.43574 6.55236 9.44831C6.56493 9.46088 6.58066 9.46983 6.59789 9.4742C6.61499 9.47854 6.63294 9.47822 6.64987 9.47328L7.42601 9.21248L7.4271 9.21212L7.4271 9.21214C7.46969 9.20011 7.50846 9.17732 7.53968 9.14597L7.5397 9.14595L13.1709 3.50415C13.1709 3.50414 13.1709 3.50412 13.1709 3.50411C13.2186 3.45585 13.2454 3.3907 13.2454 3.32282C13.2454 3.25494 13.2187 3.1898 13.1709 3.14154L6.85472 8.46035ZM6.85472 8.46035L12.496 2.82911C12.5443 2.78091 12.6098 2.75385 12.678 2.75385C12.7463 2.75385 12.8117 2.78091 12.8601 2.82911L13.1709 3.14149L6.85472 8.46035Z'
                        fill='black'
                        stroke='#4C4850'
                        stroke-width='0.046875'
                      />
                      <path
                        d='M12.0731 6.05188L8.26406 9.86844C8.11684 10.016 7.9359 10.1255 7.73688 10.1875L6.9275 10.4584C6.73542 10.5127 6.53234 10.5147 6.3392 10.4644C6.14606 10.414 5.96985 10.313 5.82871 10.1719C5.68758 10.0308 5.58662 9.85456 5.53626 9.66142C5.4859 9.46828 5.48794 9.26521 5.54219 9.07312L5.81313 8.26375C5.87492 8.06478 5.98421 7.88385 6.13156 7.73656L9.94812 3.92688C9.98311 3.89193 10.0069 3.8474 10.0166 3.7989C10.0263 3.75041 10.0214 3.70014 10.0025 3.65445C9.98357 3.60875 9.95154 3.56969 9.91044 3.5422C9.86934 3.51471 9.82101 3.50002 9.77156 3.5H3.25C2.78587 3.5 2.34075 3.68437 2.01256 4.01256C1.68437 4.34075 1.5 4.78587 1.5 5.25V12.75C1.5 13.2141 1.68437 13.6592 2.01256 13.9874C2.34075 14.3156 2.78587 14.5 3.25 14.5H10.75C11.2141 14.5 11.6592 14.3156 11.9874 13.9874C12.3156 13.6592 12.5 13.2141 12.5 12.75V6.22844C12.5 6.17899 12.4853 6.13066 12.4578 6.08956C12.4303 6.04846 12.3912 6.01643 12.3456 5.99753C12.2999 5.97864 12.2496 5.97371 12.2011 5.98338C12.1526 5.99306 12.1081 6.01689 12.0731 6.05188Z'
                        fill='black'
                      />
                    </svg>
                    Change
                  </Button>
                )}
              </div>

              <div className='flex justify-between items-center self-stretch  flex-nowrap '>
                <div className='flex  flex-col gap-[8px] items-start  flex-nowrap '>
                  <span className=" font-['Montserrat'] text-base font-normal opacity-75  text-[#112211] ">
                    Personal ID
                  </span>
                  {isEditingPersonalId ? (
                    <input
                      type='text'
                      value={newPersonalId}
                      onChange={handleInputPersonalIdChange}
                      className="font-['Montserrat'] w-[500px] text-[20px] font-semibold text-[#112211] border border-gray-300 rounded p-1"
                    />
                  ) : (
                    <span className=" font-['Montserrat'] text-[20px] font-semibold  text-[#112211] ">
                      {currentUser?.personalId === 'string' || currentUser?.personalId === null
                        ? 'Not set'
                        : currentUser?.personalId}
                    </span>
                  )}
                </div>
                {isEditingPersonalId ? (
                  <div className='flex gap-2'>
                    <Button
                      className='border-solid border-emerald-500 border-[1px] flex gap-2 p-1 px-3'
                      onClick={handleSavePersonalIdClick}
                    >
                      Save
                    </Button>
                    <Button
                      className='border-solid border-red-500 border-[1px] flex gap-2 p-1 px-3'
                      onClick={handleCancelPersonalIdClick}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    className='border-solid border-emerald-500 border-[1px] flex gap-2'
                    onClick={handleEditPersonalIdClick}
                  >
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M14.3559 1.67988L14.3558 1.67985C14.3123 1.63202 14.2595 1.59351 14.2007 1.56665C14.1419 1.53979 14.0782 1.52514 14.0135 1.52358C13.9489 1.52202 13.8846 1.53358 13.8245 1.55757C13.7645 1.58157 13.7099 1.61749 13.6641 1.66316L13.6641 1.66318L13.2776 2.04783C13.2351 2.09031 13.2112 2.14792 13.2112 2.20798C13.2112 2.26803 13.2351 2.32563 13.2775 2.36812C13.2775 2.36812 13.2775 2.36812 13.2776 2.36813L13.6319 2.72186L13.632 2.72191C13.653 2.74306 13.678 2.75985 13.7056 2.7713C13.7331 2.78275 13.7627 2.78864 13.7925 2.78864C13.8224 2.78864 13.8519 2.78275 13.8795 2.7713C13.907 2.75985 13.9321 2.74306 13.9531 2.72191L13.9532 2.72183L14.33 2.34686L14.3301 2.34683M14.3559 1.67988L14.3732 1.66407C14.555 1.86313 14.5372 2.17313 14.3466 2.36345L14.3301 2.34683M14.3559 1.67988C14.5287 1.86901 14.5124 2.16473 14.3301 2.34683M14.3559 1.67988L14.3301 2.34683M6.85472 8.46035L6.8547 8.46037C6.82335 8.49159 6.80056 8.53036 6.78853 8.57294L6.78822 8.57404L6.78819 8.57403L6.5274 9.3508C6.52245 9.36773 6.52213 9.38568 6.52647 9.40278C6.53085 9.42001 6.53979 9.43574 6.55236 9.44831C6.56493 9.46088 6.58066 9.46983 6.59789 9.4742C6.61499 9.47854 6.63294 9.47822 6.64987 9.47328L7.42601 9.21248L7.4271 9.21212L7.4271 9.21214C7.46969 9.20011 7.50846 9.17732 7.53968 9.14597L7.5397 9.14595L13.1709 3.50415C13.1709 3.50414 13.1709 3.50412 13.1709 3.50411C13.2186 3.45585 13.2454 3.3907 13.2454 3.32282C13.2454 3.25494 13.2187 3.1898 13.1709 3.14154L6.85472 8.46035ZM6.85472 8.46035L12.496 2.82911C12.5443 2.78091 12.6098 2.75385 12.678 2.75385C12.7463 2.75385 12.8117 2.78091 12.8601 2.82911L13.1709 3.14149L6.85472 8.46035Z'
                        fill='black'
                        stroke='#4C4850'
                        stroke-width='0.046875'
                      />
                      <path
                        d='M12.0731 6.05188L8.26406 9.86844C8.11684 10.016 7.9359 10.1255 7.73688 10.1875L6.9275 10.4584C6.73542 10.5127 6.53234 10.5147 6.3392 10.4644C6.14606 10.414 5.96985 10.313 5.82871 10.1719C5.68758 10.0308 5.58662 9.85456 5.53626 9.66142C5.4859 9.46828 5.48794 9.26521 5.54219 9.07312L5.81313 8.26375C5.87492 8.06478 5.98421 7.88385 6.13156 7.73656L9.94812 3.92688C9.98311 3.89193 10.0069 3.8474 10.0166 3.7989C10.0263 3.75041 10.0214 3.70014 10.0025 3.65445C9.98357 3.60875 9.95154 3.56969 9.91044 3.5422C9.86934 3.51471 9.82101 3.50002 9.77156 3.5H3.25C2.78587 3.5 2.34075 3.68437 2.01256 4.01256C1.68437 4.34075 1.5 4.78587 1.5 5.25V12.75C1.5 13.2141 1.68437 13.6592 2.01256 13.9874C2.34075 14.3156 2.78587 14.5 3.25 14.5H10.75C11.2141 14.5 11.6592 14.3156 11.9874 13.9874C12.3156 13.6592 12.5 13.2141 12.5 12.75V6.22844C12.5 6.17899 12.4853 6.13066 12.4578 6.08956C12.4303 6.04846 12.3912 6.01643 12.3456 5.99753C12.2999 5.97864 12.2496 5.97371 12.2011 5.98338C12.1526 5.99306 12.1081 6.01689 12.0731 6.05188Z'
                        fill='black'
                      />
                    </svg>
                    Change
                  </Button>
                )}
              </div>
              <div className='flex justify-between items-center self-stretch flex-nowrap '>
                <div className='flex  flex-col gap-[8px] items-start  flex-nowrap '>
                  <span className=" font-['Montserrat'] text-[16px] font-normal opacity-75  text-[#112211] ">
                    Date of birth
                  </span>
                  {isEditing ? (
                    <DayPicker
                      mode='single'
                      initialFocus
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date)
                        console.log(selectedDate)
                      }}
                      classNames={{
                        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                        month: 'space-y-4',
                        caption: 'flex justify-center pt-1 relative items-center',
                        caption_label: 'text-sm font-medium',
                        nav: 'space-x-1 flex items-center',
                        nav_button: cn(
                          buttonVariants({ variant: 'outline' }),
                          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                        ),
                        nav_button_previous: 'absolute left-1',
                        nav_button_next: 'absolute right-1',
                        table: 'w-full border-collapse space-y-1',
                        head_row: 'flex',
                        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                        row: 'flex w-full mt-2',
                        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',

                        day_range_end: 'day-range-end',
                        day_selected: 'bg-green-100 text-white hover:bg-green-600 focus:bg-green-600',
                        day_today: 'bg-accent text-accent-foreground',
                        day_outside:
                          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
                        day_disabled: 'text-muted-foreground opacity-50',
                        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
                        day_hidden: 'invisible',

                        day: 'hover:bg-green-100 rounded w-9 h-9'
                      }}
                    />
                  ) : (
                    <span className="font-['Montserrat'] text-[20px] font-semibold text-[#112211]">
                      {format(new Date(currentUser?.dayOfBirth ?? ''), 'dd/MM/yyyy') ?? 'Not set'}
                    </span>
                  )}
                </div>

                {isEditing ? (
                  <div className='flex gap-2'>
                    <button
                      className='border-solid border-emerald-500 border-[1px] flex gap-2 p-1 px-3'
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                    <button
                      className='border-solid border-red-500 border-[1px] flex gap-2 p-1 px-3'
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <Button className='border-solid border-emerald-500 border-[1px] flex gap-2' onClick={handleEditClick}>
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M14.3559 1.67988L14.3558 1.67985C14.3123 1.63202 14.2595 1.59351 14.2007 1.56665C14.1419 1.53979 14.0782 1.52514 14.0135 1.52358C13.9489 1.52202 13.8846 1.53358 13.8245 1.55757C13.7645 1.58157 13.7099 1.61749 13.6641 1.66316L13.6641 1.66318L13.2776 2.04783C13.2351 2.09031 13.2112 2.14792 13.2112 2.20798C13.2112 2.26803 13.2351 2.32563 13.2775 2.36812C13.2775 2.36812 13.2775 2.36812 13.2776 2.36813L13.6319 2.72186L13.632 2.72191C13.653 2.74306 13.678 2.75985 13.7056 2.7713C13.7331 2.78275 13.7627 2.78864 13.7925 2.78864C13.8224 2.78864 13.8519 2.78275 13.8795 2.7713C13.907 2.75985 13.9321 2.74306 13.9531 2.72191L13.9532 2.72183L14.33 2.34686L14.3301 2.34683M14.3559 1.67988L14.3732 1.66407C14.555 1.86313 14.5372 2.17313 14.3466 2.36345L14.3301 2.34683M14.3559 1.67988C14.5287 1.86901 14.5124 2.16473 14.3301 2.34683M14.3559 1.67988L14.3301 2.34683M6.85472 8.46035L6.8547 8.46037C6.82335 8.49159 6.80056 8.53036 6.78853 8.57294L6.78822 8.57404L6.78819 8.57403L6.5274 9.3508C6.52245 9.36773 6.52213 9.38568 6.52647 9.40278C6.53085 9.42001 6.53979 9.43574 6.55236 9.44831C6.56493 9.46088 6.58066 9.46983 6.59789 9.4742C6.61499 9.47854 6.63294 9.47822 6.64987 9.47328L7.42601 9.21248L7.4271 9.21212L7.4271 9.21214C7.46969 9.20011 7.50846 9.17732 7.53968 9.14597L7.5397 9.14595L13.1709 3.50415C13.1709 3.50414 13.1709 3.50412 13.1709 3.50411C13.2186 3.45585 13.2454 3.3907 13.2454 3.32282C13.2454 3.25494 13.2187 3.1898 13.1709 3.14154L6.85472 8.46035ZM6.85472 8.46035L12.496 2.82911C12.5443 2.78091 12.6098 2.75385 12.678 2.75385C12.7463 2.75385 12.8117 2.78091 12.8601 2.82911L13.1709 3.14149L6.85472 8.46035Z'
                        fill='black'
                        stroke='#4C4850'
                        stroke-width='0.046875'
                      />
                      <path
                        d='M12.0731 6.05188L8.26406 9.86844C8.11684 10.016 7.9359 10.1255 7.73688 10.1875L6.9275 10.4584C6.73542 10.5127 6.53234 10.5147 6.3392 10.4644C6.14606 10.414 5.96985 10.313 5.82871 10.1719C5.68758 10.0308 5.58662 9.85456 5.53626 9.66142C5.4859 9.46828 5.48794 9.26521 5.54219 9.07312L5.81313 8.26375C5.87492 8.06478 5.98421 7.88385 6.13156 7.73656L9.94812 3.92688C9.98311 3.89193 10.0069 3.8474 10.0166 3.7989C10.0263 3.75041 10.0214 3.70014 10.0025 3.65445C9.98357 3.60875 9.95154 3.56969 9.91044 3.5422C9.86934 3.51471 9.82101 3.50002 9.77156 3.5H3.25C2.78587 3.5 2.34075 3.68437 2.01256 4.01256C1.68437 4.34075 1.5 4.78587 1.5 5.25V12.75C1.5 13.2141 1.68437 13.6592 2.01256 13.9874C2.34075 14.3156 2.78587 14.5 3.25 14.5H10.75C11.2141 14.5 11.6592 14.3156 11.9874 13.9874C12.3156 13.6592 12.5 13.2141 12.5 12.75V6.22844C12.5 6.17899 12.4853 6.13066 12.4578 6.08956C12.4303 6.04846 12.3912 6.01643 12.3456 5.99753C12.2999 5.97864 12.2496 5.97371 12.2011 5.98338C12.1526 5.99306 12.1081 6.01689 12.0731 6.05188Z'
                        fill='black'
                      />
                    </svg>
                    Change
                  </Button>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value='tickets' className='mb-8'>
          <div className='flex w-full flex-col gap-[16px] items-start  flex-nowrap '>
            <div className='flex justify-between items-end self-stretch shrink-0 flex-nowrap mt-2'>
              <span className=" font-['TradeGothic_LT_Extended'] text-[32px] font-bold  text-black ">
                Tickets/Bookings
              </span>
              <Select>
                <SelectTrigger className='w-[120px] border-0 '>
                  <SelectValue placeholder='Upcoming' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='upcoming'>Upcoming</SelectItem>
                    <SelectItem value='ongoing'>Ongoing</SelectItem>
                    <SelectItem value='expired'>Expired</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='flex w-full py-4 px-6 gap-2 items-center  flex-nowrap bg-[#fff] rounded-[12px]  shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] overflow-hidden'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M8.74733 21.75H7.49952C7.37414 21.75 7.25077 21.7185 7.14069 21.6585C7.03062 21.5984 6.93735 21.5118 6.86941 21.4064C6.80147 21.301 6.76104 21.1803 6.7518 21.0552C6.74257 20.9302 6.76483 20.8048 6.81655 20.6906L9.83811 14.0227L5.30108 13.9219L3.64639 15.9267C3.33092 16.3233 3.07921 16.5 2.43702 16.5H1.59702C1.46402 16.5043 1.33195 16.4764 1.212 16.4188C1.09205 16.3612 0.987757 16.2755 0.907956 16.1691C0.796393 16.0186 0.686706 15.7636 0.793581 15.3998L1.72264 12.0717C1.72967 12.0469 1.73811 12.022 1.74749 11.9977C1.74795 11.9953 1.74795 11.9929 1.74749 11.9906C1.73781 11.9663 1.72951 11.9414 1.72264 11.9161L0.792643 8.56687C0.691862 8.21016 0.802018 7.96078 0.912643 7.81406C0.986929 7.71549 1.08331 7.63573 1.19403 7.58118C1.30475 7.52664 1.42672 7.49883 1.55014 7.5H2.43702C2.91655 7.5 3.38202 7.71516 3.65577 8.0625L5.27624 10.0336L9.83811 9.96609L6.81749 3.30984C6.7657 3.19568 6.74335 3.07036 6.75249 2.94533C6.76163 2.8203 6.80196 2.69956 6.8698 2.59414C6.93764 2.48872 7.03082 2.40198 7.14083 2.34186C7.25083 2.28175 7.37416 2.25016 7.49952 2.25H8.76092C8.9369 2.25354 9.10983 2.29667 9.26685 2.3762C9.42388 2.45572 9.56097 2.5696 9.66796 2.70937L15.5297 9.83438L18.2376 9.76312C18.4359 9.75234 18.9853 9.74859 19.1123 9.74859C21.7026 9.75 23.2495 10.5909 23.2495 12C23.2495 12.4434 23.0723 13.2656 21.8869 13.7887C21.187 14.0981 20.2533 14.2547 19.1114 14.2547C18.9858 14.2547 18.4378 14.2509 18.2367 14.2402L15.5292 14.168L9.65296 21.293C9.54588 21.4321 9.40891 21.5454 9.25216 21.6246C9.0954 21.7037 8.92288 21.7465 8.74733 21.75Z'
                  fill='#112211'
                />
              </svg>
              <span className="flex w-[544px] h-[20px] justify-start items-start shrink-0 basis-auto font-['Montserrat'] text-[16px] font-semibold leading-[19.504px] text-[#112211] relative text-left whitespace-nowrap z-[58]">
                Flights
              </span>
            </div>
            {/* <TicketItem />
            <TicketItem />
            <TicketItem /> */}
          </div>
        </TabsContent>
        <TabsContent value='payment' className='mb-8'>
          <div className='flex  flex-col gap-[16px] items-start flex-nowrap  mx-auto my-0'>
            <span className="font-['TradeGothic_LT_Extended'] text-[32px] font-bold  text-[#000] mt-2">
              Payment methods
            </span>
            <div className='flex w-full p-6 gap-6 items-start shrink-0 flex-nowrap bg-[#fff] rounded-[24px] '>
              <div className='flex w-[378px] h-48 p-[16px] flex-col justify-between items-start self-stretch shrink-0 flex-nowrap bg-[#8dd3bb] rounded-[16px] '>
                <div className='flex  w-full justify-between items-start  grow   flex-nowrap '>
                  <div className='flex flex-col gap-[-10px] items-start grow shrink-0 basis-0 flex-nowrap '>
                    <span className="font-['Montserrat'] text-[24px] font-semibold  text-[#112211] ">
                      **** **** ****
                    </span>
                    <span className=" font-['Montserrat'] text-[32px] font-semibold  text-[#112211] ">4321</span>
                  </div>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M21 2.25H3C2.17157 2.25 1.5 2.92157 1.5 3.75V4.5C1.5 5.32843 2.17157 6 3 6H21C21.8284 6 22.5 5.32843 22.5 4.5V3.75C22.5 2.92157 21.8284 2.25 21 2.25Z'
                      fill='black'
                    />
                    <path
                      d='M3.49031 7.50001C3.43761 7.49972 3.38544 7.51055 3.33721 7.53178C3.28898 7.55301 3.24576 7.58416 3.21038 7.62322C3.17499 7.66227 3.14824 7.70834 3.13186 7.75843C3.11548 7.80852 3.10984 7.8615 3.11531 7.91391L4.34859 19.7527C4.34833 19.7561 4.34833 19.7595 4.34859 19.763C4.41303 20.3105 4.67628 20.8154 5.08837 21.1817C5.50046 21.548 6.0327 21.7502 6.58406 21.75H17.4164C17.9676 21.75 18.4996 21.5477 18.9115 21.1814C19.3234 20.8151 19.5865 20.3104 19.6509 19.763V19.7531L20.8823 7.91391C20.8878 7.8615 20.8822 7.80852 20.8658 7.75843C20.8494 7.70834 20.8226 7.66227 20.7873 7.62322C20.7519 7.58416 20.7087 7.55301 20.6604 7.53178C20.6122 7.51055 20.56 7.49972 20.5073 7.50001H3.49031ZM15.1556 15.9698C15.2269 16.0391 15.2837 16.1219 15.3228 16.2133C15.3618 16.3048 15.3823 16.403 15.383 16.5024C15.3837 16.6019 15.3646 16.7004 15.3269 16.7924C15.2891 16.8844 15.2335 16.9679 15.1632 17.0382C15.0929 17.1085 15.0093 17.1641 14.9173 17.2018C14.8253 17.2395 14.7267 17.2585 14.6273 17.2577C14.5279 17.257 14.4296 17.2365 14.3382 17.1974C14.2468 17.1583 14.1641 17.1015 14.0948 17.0302L12.0005 14.9358L9.90562 17.0302C9.76432 17.1675 9.57467 17.2436 9.37766 17.2422C9.18065 17.2408 8.9921 17.162 8.85276 17.0227C8.71342 16.8834 8.63448 16.6949 8.633 16.4979C8.63151 16.3009 8.70761 16.1112 8.84484 15.9698L10.9397 13.875L8.84484 11.7802C8.70761 11.6388 8.63151 11.4491 8.633 11.2521C8.63448 11.0551 8.71342 10.8666 8.85276 10.7273C8.9921 10.588 9.18065 10.5092 9.37766 10.5078C9.57467 10.5064 9.76432 10.5826 9.90562 10.7198L12.0005 12.8142L14.0948 10.7198C14.2361 10.5826 14.4258 10.5064 14.6228 10.5078C14.8198 10.5092 15.0084 10.588 15.1477 10.7273C15.287 10.8666 15.366 11.0551 15.3675 11.2521C15.3689 11.4491 15.2928 11.6388 15.1556 11.7802L13.0608 13.875L15.1556 15.9698Z'
                      fill='black'
                    />
                  </svg>
                </div>
                <div className='flex justify-between items-center self-stretch grow  flex-nowrap '>
                  <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap'>
                    <span className=" font-['Montserrat'] text-[12px] font-medium  text-[#112211] ">Valid Thru</span>
                    <span className=" font-['Montserrat'] text-[20px] font-semibold  text-[#112211] ">02/27</span>
                  </div>
                  <svg width='52' height='33' viewBox='0 0 52 33' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M2.29751 -0.0078125C1.15398 -0.0078125 0.226562 0.919349 0.226562 2.06313V30.4351C0.226562 31.5788 1.15445 32.506 2.29751 32.506H49.9292C51.0727 32.506 52.0001 31.5788 52.0001 30.4351V2.06313C52.0001 0.919401 51.0723 -0.0078125 49.9292 -0.0078125H2.29751ZM31.1483 9.68193C32.4084 9.68193 33.4182 9.96026 34.0622 10.2191L33.6221 12.9874L33.3309 12.8401C32.731 12.5813 31.9605 12.3322 30.8975 12.3499C29.6252 12.3499 29.037 12.9175 29.037 13.4485C29.0296 14.0469 29.7243 14.4415 30.8603 15.0324C32.7354 15.9441 33.602 17.0496 33.5898 18.5029C33.5646 21.1545 31.3468 22.868 27.9303 22.868C26.4727 22.852 25.0685 22.5434 24.3094 22.1869L24.7656 19.3264L25.1847 19.5302C26.2521 20.0072 26.9433 20.2001 28.2441 20.2001C29.1783 20.2001 30.1809 19.8089 30.1889 18.9527C30.195 18.3935 29.7698 17.9948 28.5046 17.3687C27.2718 16.7576 25.6374 15.7338 25.6555 13.8983C25.6748 11.4151 27.9368 9.68193 31.1483 9.68193ZM4.80526 10.088H10.0522C10.7588 10.1148 11.3292 10.3422 11.5261 11.109L12.6571 16.9464C12.6572 16.947 12.6569 16.9491 12.6571 16.9496L12.9968 18.6987L16.1825 10.088H19.6287L14.5063 22.6917L11.0634 22.6949L8.32266 12.5246C9.95342 13.3886 11.3418 14.3881 12.1458 15.7637C11.9385 15.3285 11.6654 14.8371 11.3158 14.3529C10.9088 13.789 10.0297 13.0609 9.6623 12.7511C8.38194 11.6718 6.64312 10.8001 4.76483 10.3388L4.80526 10.088ZM20.9991 10.1026H24.3693L22.261 22.6868H18.8909L20.9991 10.1026ZM40.034 10.1026H42.5871L45.2599 22.6868H42.1955C42.1955 22.6868 41.8915 21.2411 41.7927 20.8003C41.311 20.8003 37.9424 20.7955 37.5634 20.7955C37.4352 21.1362 36.8677 22.6868 36.8677 22.6868H33.4005L38.3044 11.1478C38.6516 10.3278 39.2434 10.1026 40.034 10.1026ZM40.2848 13.4873C40.1189 13.9554 39.8302 14.7113 39.8495 14.6781C39.8495 14.6781 38.8121 17.4449 38.5407 18.1631L41.2668 18.1615C41.0136 16.9615 40.7601 15.7616 40.5064 14.5617L40.2848 13.4874V13.4873Z'
                      fill='#112211'
                    />
                  </svg>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='flex h-48 w-[378px] p-[16px]  flex-col gap-[10px] justify-center items-center  flex-nowrap rounded-[16px] border-dashed border-2 border-[#8dd3bb] '>
                    <svg width='64' height='65' viewBox='0 0 64 65' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M56 32.5C56 19.25 45.25 8.5 32 8.5C18.75 8.5 8 19.25 8 32.5C8 45.75 18.75 56.5 32 56.5C45.25 56.5 56 45.75 56 32.5Z'
                        stroke='#8DD3BB'
                        stroke-width='2'
                        stroke-miterlimit='10'
                      />
                      <path
                        d='M32 22.5V42.5M42 32.5H22'
                        stroke='#8DD3BB'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>

                    <span className=" font-['Montserrat'] text-[12px] font-medium opacity-75  text-[#112211] ">
                      Add a new card
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[525px] bg-white px-12'>
                  <DialogHeader>
                    <DialogTitle className='text-3xl '>Add a new Card</DialogTitle>
                  </DialogHeader>
                  <div className='grid gap-4 py-4'>
                    <div className='flex flex-col items-start gap-2'>
                      <Label htmlFor='card-number' className='text-[#112211]'>
                        Card number
                      </Label>
                      <Input id='card-number' defaultValue='4321 4321 4321 4321' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <div className='col-span-2 flex flex-col gap-2 items-start'>
                        <Label htmlFor='expired-day'>Exp. Date</Label>
                        <Input id='expired-day' defaultValue='02/24' />
                      </div>
                      <div className='col-span-2 flex flex-col gap-2 items-start'>
                        <Label htmlFor='cvc'>CVC</Label>
                        <Input id='cvc' defaultValue='123' maxLength={3} />
                      </div>
                    </div>
                    <div className='flex flex-col items-start gap-2'>
                      <Label htmlFor='card-name' className='text-[#112211]'>
                        Name on Card
                      </Label>
                      <Input id='card-name' defaultValue='John Doe' />
                    </div>
                    <div className='flex flex-col items-start gap-2'>
                      <Label htmlFor='region' className='text-[#112211]'>
                        Country or Region
                      </Label>
                      <Select>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='United States' />
                        </SelectTrigger>
                        <SelectContent className='bg-white'>
                          <SelectGroup>
                            <SelectItem value='apple'>United States</SelectItem>
                            <SelectItem value='banana'>Viet Nam</SelectItem>
                            <SelectItem value='blueberry'>Singapore</SelectItem>
                            <SelectItem value='grapes'>United Kingdom</SelectItem>
                            <SelectItem value='pineapple'>Japan</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='terms' />
                      <label
                        htmlFor='terms'
                        className='text-[#112211] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        Securely save my information for 1-click checkout
                      </label>
                    </div>
                  </div>
                  <DialogFooter>
                    <div className='flex flex-col gap-4'>
                      <Button type='submit' className='w-full bg-[#8DD3BB]'>
                        Add card
                      </Button>
                      <p className='text-[#112211] font-normal text-[10px] text-center'>
                        By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge your card for
                        this payment and future payments in accordance with their terms. You can always cancel your
                        subscription.
                      </p>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfilePage
