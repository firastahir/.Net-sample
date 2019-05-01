FROM mcr.microsoft.com/dotnet/core/sdk:2.1 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY Beep.Web/Beep.Web.csproj Beep.Web/
COPY Beep.DataModels/Beep.DataModels.csproj Beep.DataModels/
COPY Beep.APIClient/Beep.APIClient.csproj Beep.APIClient/
RUN dotnet restore

# copy everything else and build app
COPY . .
WORKDIR /app
RUN dotnet publish -c Release -o out





FROM mcr.microsoft.com/dotnet/core/aspnet:2.1 AS runtime

WORKDIR /app

COPY --from=build /app ./

ENTRYPOINT ["dotnet", "beep.web.dll"]