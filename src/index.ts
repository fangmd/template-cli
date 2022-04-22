#!/usr/bin/env node

import chalk from 'chalk'
import { Command } from 'commander'
import inquirer from 'inquirer'
import logSymbols from 'log-symbols'
import { CreateProjectPlugin } from './plugins/CreateProject'
import { gitClone } from './utils/git'

const program = new Command()

program.name('qs-cli').description('666 qs-cli').version('0.0.1')

new CreateProjectPlugin().addPlugin(program)

program
  .command('test')
  .description('test ')
  .action(async () => {
    console.log('initOptions')
  })

program.parse()
