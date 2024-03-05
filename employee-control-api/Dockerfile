FROM mcr.microsoft.com/dotnet/sdk:8 AS base
WORKDIR /app

# Copy everything else and build
COPY . ./
WORKDIR /app
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8
WORKDIR /app
COPY --from=base /app/out ./
ENV ASPNETCORE_URLS http://*:7000
ENTRYPOINT ["dotnet", "EmployeeControl.WebApi.dll"]
