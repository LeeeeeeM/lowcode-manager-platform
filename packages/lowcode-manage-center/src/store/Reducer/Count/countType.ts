import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'

export interface InitialCountState {
  count: number
}

export interface Data {
  countNumber?: number
}

export interface CountActions {
  addStateCount: ActionCreatorWithPayload<Data, string>
  reduceStateCount: ActionCreatorWithPayload<Data, string>
}