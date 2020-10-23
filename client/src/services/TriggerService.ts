import { ITrigger } from '../shared/types'

export const triggerCreate = (trigger: ITrigger): Promise<ITrigger> => {
  return (window as any).app.trigger.create(trigger)
}

export const triggerFindAll = (): Promise<ITrigger[]> => {
  return (window as any).app.trigger.findAll()
}

export const triggerFindOne = (id: string): Promise<ITrigger> => {
  return (window as any).app.trigger.findOne(id)
}

export const triggerUpdate = (data: ITrigger): Promise<ITrigger> => {
  return (window as any).app.trigger.update(data)
}

export const triggerDelete = (data: ITrigger): Promise<void> => {
  return (window as any).app.trigger.delete(data)
}
