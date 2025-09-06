#!/bin/sh

com1="cd backend && npm run dev"
com2="cd frontend && npm run dev"

eval "$com1" &

eval "$com2" &
