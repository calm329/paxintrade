import React, { useContext } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import { MeetCreateModal } from '../profiles/conference/meet-create-modal';
import { Button } from './button';
import { createRoom, createRoomId } from '@/helpers/api/paxMeetAPI';
import { PaxContext } from '@/context/context';
import toast from 'react-hot-toast';

interface DropdownMenuDemoProps {
  children?: React.ReactNode;
  onFileUpload?: (files: File[]) => void;
  onRoomCreate?: (link: string) => void;
}

const DropdownMenuDemo = ({
  children,
  onFileUpload,
  onRoomCreate,
}: DropdownMenuDemoProps) => {
  const { user } = useContext(PaxContext);
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState('pedro');
  const [roomCreateLoading, setRoomCreateLoading] =
    React.useState<boolean>(false);
  const [conferenceModalOpen, setConferenceModalOpen] = React.useState(false);
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const conferenceModalButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleFileUpload = () => {
    if (!inputFileRef.current) return;

    const files = inputFileRef.current.files;

    if (files) {
      onFileUpload && onFileUpload(Array.from(files));
    }

    inputFileRef.current.value = '';
  };

  const handleFileUploadClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleOpenConferenceModal = () => {
    setConferenceModalOpen(true);
    // conferenceModalButtonRef.current &&
    //   conferenceModalButtonRef.current.click();
  };

  const onCreateRoom = async (feed: string) => {
    if (!user) return;

    setRoomCreateLoading(true);
    const roomId = createRoomId(feed);
    const token = await createRoom(roomId, user.id, user.username);
    setRoomCreateLoading(false);

    if (token) {
      toast.success('New Room is created.', {
        position: 'top-right',
      });

      setConferenceModalOpen(false);

      onRoomCreate &&
        onRoomCreate(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/meet/${roomId}`);
      console.log(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/meet/${roomId}`);
    } else {
      toast.error('Failed to create room. Please try again', {
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <input
        type='file'
        className='hidden'
        ref={inputFileRef}
        multiple
        onChange={handleFileUpload}
      />
      <MeetCreateModal
        isLoading={roomCreateLoading}
        open={conferenceModalOpen}
        setOpen={setConferenceModalOpen}
        onCreate={onCreateRoom}
      >
        <Button className='hidden' ref={conferenceModalButtonRef}></Button>
      </MeetCreateModal>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className='DropdownMenuContent relative z-10 bg-card-gradient-menu'
            sideOffset={5}
          >
            <DropdownMenu.Item
              className='DropdownMenuItem'
              onClick={handleFileUploadClick}
            >
              Upload file <div className='RightSlot'>⌘+T</div>
            </DropdownMenu.Item>

            <DropdownMenu.Sub>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  className='DropdownMenuSubContent bg-card-gradient-menu'
                  sideOffset={2}
                  alignOffset={-5}
                >
                  <DropdownMenu.Item className='DropdownMenuItem'>
                    Save Page As… <div className='RightSlot'>⌘+S</div>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className='DropdownMenuItem'>
                    Create Shortcut…
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className='DropdownMenuItem'>
                    Name Window…
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className='DropdownMenu.Separator' />
                  <DropdownMenu.Item className='DropdownMenuItem'>
                    Developer Tools
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator className='DropdownMenuSeparator' />

            <DropdownMenu.CheckboxItem
              className='DropdownMenuCheckboxItem'
              checked={bookmarksChecked}
              onCheckedChange={setBookmarksChecked}
            >
              <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              Show Bookmarks <div className='RightSlot'>⌘+B</div>
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem
              className='DropdownMenuCheckboxItem'
              checked={urlsChecked}
              onCheckedChange={setUrlsChecked}
            >
              <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              Show Full URLs
            </DropdownMenu.CheckboxItem>

            <DropdownMenu.Separator className='DropdownMenuSeparator' />

            <DropdownMenu.Item
              className='DropdownMenuItem'
              onClick={handleOpenConferenceModal}
            >
              Create a conference
            </DropdownMenu.Item>
            <DropdownMenu.RadioGroup
              value={person}
              onValueChange={setPerson}
            ></DropdownMenu.RadioGroup>

            <DropdownMenu.Arrow className='DropdownMenuArrow' />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

export default DropdownMenuDemo;
