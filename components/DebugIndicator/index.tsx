import { VscDebugConsole } from 'react-icons/vsc'

const IS_DEV_ENV = process.env.NEXT_PUBLIC_ENV === 'developement' || 'local'

export const DebugIndicatior: React.FC = () => {
  return IS_DEV_ENV ? (
    <div className="fixed top-0 right-0 m-4 text-green-600">
      <VscDebugConsole size={16} />
    </div>
  ) : null
}
