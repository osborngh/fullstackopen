#!/bin/sh

com1="cd backend && npm run dev"
com2="cd introdemo && npm run dev"

eval "$com1" &

eval "$com2" &
