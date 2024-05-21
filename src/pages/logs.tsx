import Base from '../components/base';

interface Log {
  projectName: string;
  day: string;
  duration: number;
}

export default function Logs(): JSX.Element {

  const logs: Log[] = JSON.parse(localStorage.getItem('logs') || '[]');

  return (
    <Base>
      <div>
        <div className="">
          <div className="p-20">
            <h1 className="text-3xl font-medium text-white mb-6">Meu histórico</h1>
            <div className="">
              <table className="w-[656px]">
                <thead>
                  <tr className='h-[54px] bg-[#323238] text-left text-md leading-4 font-medium text-[#E1E1E6]'>
                    <th className="px-6 py-3">Tarefa</th>
                    <th className="px-6 py-3">Dia</th>
                    <th className="px-6 py-3">Duração</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log: Log, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-[#29292E]' : 'bg-[#29292E]'}>
                      <td className="px-6 py-4 text-[#C4C4CC]">{log.projectName}</td>
                      <td className="px-6 py-4 text-[#C4C4CC]">{log.day}</td>
                      <td className="px-6 py-4 text-[#C4C4CC]">{log.duration} minutos</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}