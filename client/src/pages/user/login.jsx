import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { userLoginValidation } from '@/validations/user-validation';
import InputField from '@/components/form-field';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userLoginValidation),
    reValidateMode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md mx-4 my-16 h-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your username and password to log in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4 py-6">
            <InputField
              label="Email"
              name="email"
              type="email"
              register={register}
              errors={errors}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              register={register}
              errors={errors}
            />
          </CardContent>
          <CardFooter className="p-4">
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
