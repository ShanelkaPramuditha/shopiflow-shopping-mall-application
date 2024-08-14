import { FaRegUserCircle } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AvatarImg from '@/assets/avatar.png';

export default function AvatarIcon() {
  const isLoggedIn = false;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-9 w-9 hover:cursor-pointer">
            {isLoggedIn ? (
              <AvatarImage src={AvatarImg} alt="User's avatar" />
            ) : (
              <AvatarFallback>
                <FaRegUserCircle className="h-full w-full text-gray-500 dark:text-gray-400" />
              </AvatarFallback>
            )}

            <span className="sr-only">Toggle user menu</span>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {isLoggedIn ? (
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <span className="font-bold">Name</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="#" className="underline">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="outline"
                  onClick={() => {
                    alert('You have successfully logged out.');
                  }}
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : (
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="/login" className="w-full h-full">
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/register" className="w-full h-full">
                  Register
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
