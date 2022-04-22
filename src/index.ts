#!/usr/bin/env node

import { Command } from 'commander'
import { CreateProjectPlugin } from './plugins/CreateProject'
import { ImageCompressPlugin } from './plugins/ImageCompressPlugin'

const program = new Command()

program.name('qs-cli').description('666 qs-cli').version('0.0.1')

new CreateProjectPlugin().addPlugin(program)

new ImageCompressPlugin().addPlugin(program)

program
  .command('test')
  .description('test ')
  .action(async () => {
    console.log('initOptions')
  })

program.parse()
