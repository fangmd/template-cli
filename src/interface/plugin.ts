import { Command } from 'commander'

export interface CommandPlugin {
  addPlugin(program: Command): any
}
