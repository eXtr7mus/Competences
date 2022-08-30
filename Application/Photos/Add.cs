using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Application.Core;
using Microsoft.AspNetCore.Http;
using System.Threading;
using Persistence;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Photos
{
    public class Add
    {
        public class Command: IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _context = context;
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(x => x.UserPhoto)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                 var currentPhoto = user.UserPhoto;

                if (currentPhoto != null)
                {
                    var deleteResult = await _photoAccessor.DeletePhoto(currentPhoto.Id);

                    if (deleteResult == null) return Result<Photo>.Failure("Error deleting photo from cloudinary");

                    _context.Photos.Remove(currentPhoto);
                }

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                user.UserPhoto = photo;

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Photo>.Success(photo);

                return Result<Photo>.Failure("Problem adding photo");
            }
        }
    }
}