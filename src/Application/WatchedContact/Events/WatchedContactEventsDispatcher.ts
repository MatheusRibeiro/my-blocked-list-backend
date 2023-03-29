import { singleton } from 'tsyringe'
import EventDispatcher from '@src/Application/Base/EventDispatcher/EventDispatcher'

@singleton()
export default class WatchedContactEventDispatcher extends EventDispatcher {}
