import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import Base from '../components/base';
import { Button } from '@/components/ui/button';
import Alarm from '/alarm.mp3';

export default function Home(): JSX.Element {
  const [value, setValue] = useState<string>("0");
  const [timeLeft, setTimeLeft] = useState<number>(parseInt(value, 10) * 60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 1) {
            playAlarm();
            logTime();
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const handleIncrement = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const newValue = parseInt(value, 10) + 1;
    setValue(newValue.toString());
    setTimeLeft(newValue * 60);
  };

  const handleDecrement = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const newValue = Math.max(parseInt(value, 10) - 1, 0);
    setValue(newValue.toString());
    setTimeLeft(newValue * 60);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let newValue = event.target.value;

    newValue = newValue.replace(/^0+/, '');

    const parsedValue = parseInt(newValue, 10);

    if (isNaN(parsedValue) || parsedValue < 0) {
      newValue = "0";
    }

    setValue(newValue);
    setTimeLeft(parseInt(newValue, 10) * 60);
  };

  const startTimer = (): void => {
    setTimerRunning(true);
  };

  const playAlarm = (): void => {
    const alarmAudio = document.getElementById("alarmAudio") as HTMLAudioElement;
    alarmAudio.play();
  };

  const logTime = (): void => {
    const currentDate = new Date();
    const logEntry = {
      projectName: projectName,
      day: currentDate.toLocaleDateString(),
      duration: parseInt(value, 10)
    };
    const logs: any[] = JSON.parse(localStorage.getItem('logs') || '[]');
    logs.push(logEntry);
    localStorage.setItem('logs', JSON.stringify(logs));
  };

  return (
    <Base>
      <div className='w-[656px] h-[424px] mt-[85px]'>
        <form action="" className='flex justify-center items-center text-gray-100 gap-2'>
          <h2 className='text-lg'>Vou trabalhar em</h2>
          <input
            type="text"
            placeholder='Dê um nome para o seu projeto'
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className='w-[272px] text-white duration-300 p-2 focus:border-[#00875F] placeholder:text-[#7C7C8A] placeholder:text-center font-medium placeholder:font-medium placeholder:text-lg h-10 bg-inherit outline-none border-b-[#7C7C8A] border-b-2'
          />
          <h2 className='text-lg'>durante</h2>
          <div className='flex items-center relative'>
            <button onClick={handleDecrement} className="text-[#7C7C8A] duration-300 hover:text-[#00875F] absolute text-xl font-medium left-2">-</button>
            <input
              type="number"
              placeholder='00'
              value={value}
              onChange={handleChange}
              className='w-[72px] text-center text-[#7C7C8A] duration-300 focus:border-[#00875F] font-medium h-10 bg-inherit outline-none border-b-[#7C7C8A] border-b-2'
            />
            <button onClick={handleIncrement} className="text-[#7C7C8A] duration-300 hover:text-[#00875F] absolute right-2 font-medium text-xl">+</button>
          </div>
          <h2 className='text-lg'>minutos.</h2>
        </form>
        <div className='flex items-center justify-center gap-4 mt-10'>
          <div className='w-36 h-[198.02px] bg-[#29292E] flex justify-center items-center text-[160px] rounded-[8px] '>
            <h1 className='numberclass text-[#E1E1E6] font-bold'>{Math.floor(timeLeft / 600)}</h1>
          </div>
          <div className='w-36 h-[198.02px] bg-[#29292E] flex justify-center items-center text-[160px] rounded-[8px] '>
            <h1 className='numberclass text-[#E1E1E6] font-bold'>{Math.floor((timeLeft % 600) / 60)}</h1>
          </div>
          <div>
            <h1 className='text-[160px] text-[#00875F] font-bold'>:</h1>
          </div>
          <div className='w-36 h-[198.02px] bg-[#29292E] flex justify-center items-center text-[160px] rounded-[8px] '>
            <h1 className='numberclass text-[#E1E1E6] font-bold'>{Math.floor((timeLeft % 60) / 10)}</h1>
          </div>
          <div className='w-36 h-[198.02px] bg-[#29292E] flex justify-center items-center text-[160px] rounded-[8px] '>
            <h1 className='numberclass text-[#E1E1E6] font-bold'>{(timeLeft % 60) % 10}</h1>
          </div>
        </div>
        <Button onClick={startTimer} disabled={timerRunning} className='w-full h-16 rounded-[8px] text-center duration-300 bg-[#00875F] hover:bg-[#185f4a] text-base mt-10'>Começar</Button>
        <audio id="alarmAudio" src={Alarm} />
      </div>
    </Base>
  );
}
